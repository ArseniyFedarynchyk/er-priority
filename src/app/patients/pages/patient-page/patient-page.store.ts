import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, exhaustMap, tap } from 'rxjs';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { Patient } from '../../models/patient.model';
import { Triage } from '../../models/triage.model';
import { PatientApiService } from '../../services/patient-api.service';
import { TriageService } from '../../services/triage.service';

export interface PatientPageState {
  patients: Patient[];
  patientSelected: Patient | null;
  triage: Triage[];
  isLoading: boolean;
  searchFormValue: string;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class PatientPageStore extends ComponentStore<PatientPageState> {
  private readonly patients$ = this.select(state => state.patients);
  private readonly searchFormValue$ = this.select(
    state => state.searchFormValue,
  );
  private readonly filteredPatients$ = this.select(
    this.patients$,
    this.searchFormValue$,
    (patients, searchFormValue) => {
      console.log(patients);
      console.log(searchFormValue);
      return patients.filter(patient =>
        patient.pesel.toString().includes(searchFormValue),
      );
    },
  );
  private readonly patintSelected$ = this.select(
    state => state.patientSelected,
  );
  private readonly triage$ = this.select(state => state.triage);
  private readonly triageSelected$ = this.select(
    this.triage$,
    this.patintSelected$,
    (triage, patientSelected) => {
      const searchId = patientSelected?.id;
      const triageArray = triage.filter(item => item.patientId === searchId);
      return triageArray[0];
    },
  );
  private readonly isLoading$ = this.select(state => state.isLoading);
  private readonly error$ = this.select(state => state.error);
  readonly vm$ = this.select({
    patients: this.patients$,
    filteredPatients: this.filteredPatients$,
    triageSelected: this.triageSelected$,
    isLoading: this.isLoading$,
    error: this.error$,
  });

  constructor(
    private readonly patientApiService: PatientApiService,
    private readonly triageService: TriageService,
  ) {
    super({
      patients: [],
      patientSelected: null,
      triage: [],
      isLoading: false,
      searchFormValue: '',
      error: null,
    });
  }

  readonly fetchPatients = this.effect<void>(source$ => {
    return source$.pipe(
      tap(() => this.patchState({ isLoading: true, error: null })),
      exhaustMap(() => {
        return this.patientApiService.getAllPatients().pipe(
          tapResponse({
            next: patientsArray => {
              this.patchState({ patients: patientsArray });
            },
            error: (e: HttpErrorResponse) => {
              this.patchState({ error: e.message });
            },
            finalize: () => this.patchState({ isLoading: false }),
          }),
        );
      }),
    );
  });

  readonly removePatient = this.effect<number>(
    ($source: Observable<number>) => {
      return $source.pipe(
        exhaustMap(id => {
          return this.patientApiService.removePatient(id);
        }),
      );
    },
  );

  readonly fetchTriage = this.effect<void>(source$ => {
    return source$.pipe(
      tap(() => this.patchState({ isLoading: true, error: null })),
      exhaustMap(() => {
        return this.triageService.getTriage().pipe(
          tapResponse({
            next: triageArray => {
              this.patchState({ triage: triageArray });
            },
            error: (e: HttpErrorResponse) => {
              this.patchState({ error: e.message });
            },
            finalize: () => this.patchState({ isLoading: false }),
          }),
        );
      }),
    );
  });

  readonly updateTriage = this.effect<Triage>(($source: Observable<Triage>) => {
    return $source.pipe(
      exhaustMap(triage => {
        return this.triageService.updateTriage(triage);
      }),
    );
  });

  readonly updatePatienValue = this.effect((source$: Observable<Patient>) => {
    return source$.pipe(
      tap(patient => this.patchState({ patientSelected: patient })),
    );
  });

  readonly applyFilter = this.effect<
    ReturnType<ToolbarComponent['searchFilterForm']['getRawValue']>
  >($source => {
    return $source.pipe(
      tap(searchFormValue =>
        this.patchState({ searchFormValue: searchFormValue.searchFormValue }),
      ),
    );
  });
}
