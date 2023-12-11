import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Patient } from '../../models/patient.model';
import { AgePipe } from '../../pipes/age.pipe';

@Component({
  selector: 'erp-patient-triage-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    DatePipe,
    AgePipe,
    MatIconModule,
  ],
  templateUrl: './patient-triage-dialog.component.html',
  styleUrls: ['./patient-triage-dialog.component.scss'],
})
export class PatientTriageDialogComponent {
  @Output() closePatientDialog = new EventEmitter<void>();
  @Input({ required: true }) patient!: Patient;

  onClose(): void {
    this.closePatientDialog.emit();
  }
}
