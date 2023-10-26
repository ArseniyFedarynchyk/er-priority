import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Patient } from '../../models/patient.model';
import { AgePipe } from '../../pipes/age.pipe';

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

  onClick(): void {
    console.log('Patient tile was clicked!');
  }

  onButtonDeleteClick(): void {
    console.log('Button delete was clicked!');
  }

  onButtonEditClick(): void {
    console.log('Button edit was clicked!');
  }
}
