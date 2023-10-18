import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, map, shareReplay } from 'rxjs';

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
  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
}
