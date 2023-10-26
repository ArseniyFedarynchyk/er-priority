import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

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
export class AddEditDialogComponent {
  readonly currentDate = new Date().toISOString();
  readonly form = this.fb.group({
    firstName: [''],
    secondName: [''],
    dateOfBirth: [''],
    pesel: ['', [Validators.minLength(11), Validators.maxLength(11)]],
    sex: [''],
    registrationTime: [this.currentDate],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: DialogRef<AddEditDialogComponent>,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Submit button was clicked!');
    console.log(this.form.getRawValue());
    this.dialogRef.close();
  }
}
