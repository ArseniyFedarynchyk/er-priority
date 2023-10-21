import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

const PATIENTS_DATA = [
  {
    position: 1,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 32,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 2,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 42,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 3,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 52,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 4,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 72,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 5,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 52,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 6,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 27,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 7,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 27,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 8,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 24,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 9,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 24,
    pesel: 99999999999,
    time: new Date(),
  },
  {
    position: 10,
    secondName: 'Sasin',
    firstName: 'Jakub',
    age: 27,
    pesel: 99999999999,
    time: new Date(),
  },
];

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
  dataSource = PATIENTS_DATA;

  onClick(): void {
    console.log('Mat-card was clicked!');
  }

  onButtonDeleteClick(): void {
    console.log('Button delete was clicked!');
  }

  onButtonEditClick(): void {
    console.log('Button edit was clicked!');
  }
}
