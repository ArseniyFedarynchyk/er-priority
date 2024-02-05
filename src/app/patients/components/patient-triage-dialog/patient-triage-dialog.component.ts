import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Patient } from '../../models/patient.model';
import { Triage } from '../../models/triage.model';
import { AgePipe } from '../../pipes/age.pipe';
import { SexPipe } from '../../pipes/sex.pipe';

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
    SexPipe,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './patient-triage-dialog.component.html',
  styleUrls: ['./patient-triage-dialog.component.scss'],
})
export class PatientTriageDialogComponent implements OnInit {
  @Output() closePatientDialog = new EventEmitter<void>();
  @Output() triage = new EventEmitter<Triage>();
  @Input({ required: true }) patient!: Patient;
  @Input({ required: true }) triageOfSelectedPatient!: Triage;
  readonly consciousnessArr: string[] = [
    'A (Alert) – przytomny, skupia uwagę',
    'V (Verbal) – reaguje na polecenia głosowe',
    'P (Pain) – reaguje na bodźce bólowe',
    'U (Unresponsive) – nieprzytomny, nie reaguje na żadne bodźce.',
  ];
  readonly painLevels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly oxygenLevels: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];
  readonly patientTriageForm = this.fb.nonNullable.group({
    symptoms: ['', Validators.required],
    allergies: [''],
    medicine: [''],
    chronicDiseases: [''],
    circumstances: [''],
    sistolicBloodPressure: [''],
    diastolicBloodPressure: [''],
    puls: [''],
    temperature: [''],
    saturation: [''],
    oxygenTherapy: [''],
    consciousness: [''],
    painIntensity: [''],
    priority: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.triageOfSelectedPatient);
    this.patientTriageForm.patchValue(this.triageOfSelectedPatient);
  }

  onClose(): void {
    this.closePatientDialog.emit();
  }

  onSubmit(): void {
    const triageFormValue = this.patientTriageForm.getRawValue();
    this.triage.emit({ ...triageFormValue, patientId: this.patient.id });
    this.closePatientDialog.emit();
  }
}
