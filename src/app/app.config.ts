import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
  ],
};
