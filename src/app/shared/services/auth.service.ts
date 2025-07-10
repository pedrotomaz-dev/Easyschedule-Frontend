import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  name: string;
  role: string; 
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly moduloApi = 'auth';

  constructor(
    private apiCommunication: ApiCommunication,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(credentials: any): Observable<string> {
    return this.apiCommunication.post<string>(`${this.moduloApi}/login`, credentials).pipe(
      tap(token => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', token);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('auth_token') : null;
  }

  getRole(): string | null {

    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role || null;
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }

}
