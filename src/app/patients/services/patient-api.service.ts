import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  constructor(private readonly http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiBaseUrl}v1/patients`);
  }

  removePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}v1/patients/${id}`);
  }

  updatePatient(patient: Patient): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}v1/patients`, patient);
  }
}
