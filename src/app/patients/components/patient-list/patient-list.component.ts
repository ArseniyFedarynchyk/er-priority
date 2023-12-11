import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Patient } from '../../models/patient.model';
import { AgePipe } from '../../pipes/age.pipe';
import { PatientAddEditDialogComponent } from '../patient-add-edit-dialog/patient-add-edit-dialog.component';

@Component({
  selector: 'erp-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    AgePipe,
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
  displayedColumns: string[] = [
    'number',
    'name',
    'age',
    'pesel',
    'time',
    'buttons',
  ];
  @Input({ required: true }) patientsArray!: Patient[];
  @Output() delete = new EventEmitter<number>();
  @Output() patientTriageDialogOpen = new EventEmitter<Patient>();

  constructor(private readonly matDialog: MatDialog) {}

  onPatientTileClick(patient: Patient): void {
    this.patientTriageDialogOpen.emit(patient);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onEdit(patient: Patient): void {
    this.matDialog.open(PatientAddEditDialogComponent, {
      data: patient,
    });
  }
}
