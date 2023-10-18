import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'erp-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
