import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PatientPageStore } from 'src/app/patients/pages/patient-page/patient-page.store';

@Component({
  selector: 'erp-patient-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './patient-toolbar.component.html',
  styleUrls: ['./patient-toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  readonly searchFilterForm = this.fb.nonNullable.group({
    searchFormValue: [''],
  });
  private readonly searchFormValue$ = this.searchFilterForm.valueChanges.pipe(
    startWith(null),
    map(() => this.searchFilterForm.getRawValue()),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly pateintPageStore: PatientPageStore,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.pateintPageStore.applyFilter(this.searchFormValue$);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
