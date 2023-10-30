import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() delete = new EventEmitter<number>();

  onClick(): void {
    console.log('Patient tile was clicked!');
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onEdit(): void {
    console.log('Button edit was clicked!');
  }
}
