import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { PatientApiService } from '../../services/patient-api.service';

export interface PatientPageState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
}

@Injectable()
export class PatientPageStore extends ComponentStore<PatientPageState> {
  private readonly patients$ = this.select(state => state.patients);
  private readonly isLoading$ = this.select(state => state.isLoading);
  private readonly error$ = this.select(state => state.error);
  readonly vm$ = this.select({
    patients: this.patients$,
    isLoading: this.isLoading$,
    error: this.error$,
  });

  constructor(private readonly patientApiService: PatientApiService) {
    super({ patients: [], isLoading: false, error: null });
  }

  readonly fetchPatients = this.effect<void>(source$ => {
    return source$.pipe(
      tap(() => this.patchState({ isLoading: true, error: null })),
      exhaustMap(() => {
        return this.patientApiService.getAllPatients().pipe(
          tapResponse({
            next: patientsArray => {
              this.patchState({ patients: patientsArray });
              console.log(patientsArray);
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
}
