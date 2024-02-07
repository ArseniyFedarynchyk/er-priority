import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './patients/components/patient-toolbar/patient-toolbar.component';

@Component({
  selector: 'erp-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get isLoginPageShown(): boolean {
    const matchOptions: IsActiveMatchOptions = {
      matrixParams: 'subset',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    };
    return this.router.isActive('/login', matchOptions);
  }

  constructor(private readonly router: Router) {}
}
