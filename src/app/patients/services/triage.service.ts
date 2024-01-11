import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Triage } from '../models/triage.model';

@Injectable({
  providedIn: 'root',
})
export class TriageService {
  constructor(private readonly http: HttpClient) {}

  getTriage(): Observable<Triage[]> {
    return this.http.get<Triage[]>(`${environment.apiBaseUrl}v1/triage`);
  }

  updateTriage(triage: Triage): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}v1/triage`, triage);
  }
}
