import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  ],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss'],
  providers: [PatientPageStore],
})
export class PatientPageComponent implements OnInit {
  constructor(private readonly patientPageStore: PatientPageStore) {}

  ngOnInit(): void {
    this.patientPageStore.fetchPatients();
  }
}
