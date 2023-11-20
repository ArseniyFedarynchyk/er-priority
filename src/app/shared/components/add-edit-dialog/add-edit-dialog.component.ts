import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Patient } from 'src/app/patients/models/patient.model';
import { PatientApiService } from 'src/app/patients/services/patient-api.service';

@Component({
  selector: 'erp-add-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss'],
  providers: [MatDatepickerModule],
})
export class AddEditDialogComponent implements OnInit {
  readonly currentDate = new Date().toISOString();
  readonly form = this.fb.nonNullable.group({
    firstName: [''],
    secondName: [''],
    dateOfBirth: [''],
    pesel: ['', [Validators.minLength(11), Validators.maxLength(11)]],
    sex: [''],
    registrationTime: [this.currentDate],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: DialogRef<AddEditDialogComponent, Patient>,
    @Inject(MAT_DIALOG_DATA) private patient: Patient,
    private readonly patientApiService: PatientApiService,
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.patient);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const patientFormValue = this.form.getRawValue();
    this.patientApiService
      .updatePatient({
        id: this.patient.id,
        ...patientFormValue,
      })
      .subscribe(() => this.dialogRef.close());
  }
}
