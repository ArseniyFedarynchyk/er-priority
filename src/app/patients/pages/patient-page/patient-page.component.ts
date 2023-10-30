import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddEditDialogComponent } from 'src/app/shared/components/add-edit-dialog/add-edit-dialog.component';
import { PatientListComponent } from '../../components/patient-list/patient-list.component';
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
    AddEditDialogComponent,
    MatNativeDateModule,
  ],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss'],
  providers: [PatientPageStore],
})
export class PatientPageComponent implements OnInit {
  readonly vm$ = this.patientPageStore.vm$;

  constructor(
    private readonly patientPageStore: PatientPageStore,
    private readonly matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.patientPageStore.fetchPatients();
  }

  openDialog(): void {
    this.matDialog.open(AddEditDialogComponent);
  }

  onDelete(id: number): void {
    this.patientPageStore.removePatient(id);
  }
}
