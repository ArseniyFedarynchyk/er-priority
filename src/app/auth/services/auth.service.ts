import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserData } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiBaseUrl;
  private user: UserData | null = null;
  get isAuthenticated(): boolean {
    return !!this.user;
  }
  get userData(): UserData | null {
    return this.user;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly ngxRolesService: NgxRolesService,
  ) {}

  authenticate(username: string, password: string): Observable<UserData> {
    return this.http
      .post<UserData>(`${this.apiUrl}v1/user/login`, { username, password })
      .pipe(
        tap((response: UserData) => {
          this.user = response;
          this.user.roles.forEach(role => {
            this.ngxRolesService.addRole(role, () => true);
          });
        }),
      );
  }

  logout(): void {
    this.user = null;
    this.ngxRolesService.flushRoles();
  }
}
