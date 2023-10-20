import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'erp-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    LayoutModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

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
