import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  ],
  templateUrl: './patient-triage-dialog.component.html',
  styleUrls: ['./patient-triage-dialog.component.scss'],
})
export class PatientTriageDialogComponent {
  @Output() closePatientDialog = new EventEmitter<void>();

  onClose(): void {
    this.closePatientDialog.emit();
  }
}
