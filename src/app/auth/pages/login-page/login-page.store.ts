import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

interface LoginPageState {
  error: string | null;
  isPasswordHidden: boolean;
}

export interface Credentials {
  login: string;
  password: string;
}

@Injectable()
export class LoginPageStore extends ComponentStore<LoginPageState> {
  private readonly error$ = this.select(state => state.error);
  private readonly isPasswordHidden$ = this.select(
    state => state.isPasswordHidden,
  );

  readonly vm$ = this.select(
    {
      error: this.error$,
      isPasswordHidden: this.isPasswordHidden$,
    },
    { debounce: true },
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    super({ error: null, isPasswordHidden: true });
  }

  togglePasswordVisibility(): void {
    this.patchState(state => ({ isPasswordHidden: !state.isPasswordHidden }));
  }

  readonly login = this.effect<Credentials>(credentials$ => {
    return credentials$.pipe(
      tap(() => this.patchState({ error: null })),
      exhaustMap(credentials =>
        this.authService
          .authenticate(credentials.login, credentials.password)
          .pipe(
            tapResponse({
              next: () => {
                this.router.navigate(['/patients']);
              },
              error: () => {
                this.patchState({ error: 'Niepoprawny login lub hasło' });
              },
            }),
          ),
      ),
    );
  });
}
