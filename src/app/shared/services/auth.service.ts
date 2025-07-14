import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ApiCommunication } from '../../core/services/api-communication.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';



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

  login(credentials: any): Observable<any> {
    return this.apiCommunication.post<any>(`${this.moduloApi}/login`, credentials).pipe(
      tap(response => {

        // Verifica se estamos no navegador
        if (isPlatformBrowser(this.platformId)) {
          const token = response.token;

          // Verifica se o token existe e tem o formato correto
          if (token && typeof token === 'string' && token.split('.').length === 3) {
            localStorage.setItem('auth_token', token);
          } else {
            console.error('Token inválido recebido:', token);
          }
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
    const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    const token = typeof window !== 'undefined' && localStorage ? localStorage.getItem('auth_token') : null;
    if (!token) return null;

    try {
      const decoded = jwtDecode<any>(token);
      return decoded[ROLE_CLAIM] || null;
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }

}
