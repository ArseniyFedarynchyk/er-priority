import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Credentials, LoginPageStore } from './login-page.store';

@Component({
  selector: 'erp-login-page',
  standalone: true,
  providers: [LoginPageStore],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class LoginPageComponent {
  readonly vm$ = this.loginPageStore.vm$;

  readonly authForm = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginPageStore: LoginPageStore,
  ) {}

  togglePasswordVisibility(): void {
    this.loginPageStore.togglePasswordVisibility();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.loginPageStore.patchState({
        error: 'Credentials are incorrect',
      });
      return;
    }
    const credentials: Credentials = this.authForm.getRawValue();
    this.loginPageStore.login(credentials);
  }
}
