import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from 'src/app/patients/components/patient-toolbar/patient-toolbar.component';
import { PatientAddEditDialogComponent } from '../../components/patient-add-edit-dialog/patient-add-edit-dialog.component';
import { PatientListComponent } from '../../components/patient-list/patient-list.component';
import { PatientTriageDialogComponent } from '../../components/patient-triage-dialog/patient-triage-dialog.component';
import { Patient } from '../../models/patient.model';
import { Triage } from '../../models/triage.model';
import { PatientPageStore } from './patient-page.store';

@Component({
  selector: 'erp-patient-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PatientListComponent,
    MatDialogModule,
    PatientAddEditDialogComponent,
    MatNativeDateModule,
    PatientTriageDialogComponent,
    ToolbarComponent,
  ],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss'],
  providers: [PatientPageStore],
})
export class PatientPageComponent implements OnInit {
  readonly vm$ = this.patientPageStore.vm$;
  patientTriageDialogIsOpen = false;
  patient!: Patient;

  constructor(
    private readonly patientPageStore: PatientPageStore,
    private readonly matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.patientPageStore.fetchPatients();
    this.patientPageStore.fetchTriage();
  }

  openDialog(): void {
    this.matDialog.open(PatientAddEditDialogComponent);
  }

  onDelete(id: number): void {
    this.patientPageStore.removePatient(id);
  }

  openPatientDialog(patient: Patient): void {
    this.patientPageStore.updatePatienValue(patient);
    this.patientTriageDialogIsOpen = true;
    this.patient = patient;
  }

  closePatientDialog(): void {
    this.patientTriageDialogIsOpen = false;
  }

  updateTriage(triage: Triage): void {
    this.patientPageStore.updateTriage(triage);
  }
}
