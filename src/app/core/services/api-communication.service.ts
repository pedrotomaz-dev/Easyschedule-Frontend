import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiCommunication {
  private readonly baseUrl = 'https://localhost:44323/api'; 
  // private readonly baseUrl = 'https://easyschedule.somee.com/api'; 

  constructor(private http: HttpClient) { }

  // Configuração padrão de cabeçalhos (se necessário)
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getAuthToken()}`, // Caso precise de autenticação
    });
  }

  // Obtém o token de autenticação (exemplo)
  private getAuthToken(): string | null {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('authToken') ?? '';
  }
  return '';
}

  // Método GET
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.getDefaultHeaders(),
        params,
      })
      .pipe(
        map(x => x), 
        catchError(this.handleError),
      );
  }

  // Método POST
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getDefaultHeaders(),
      })
      .pipe(map(x => x), catchError(this.handleError));
  }

  // Método PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getDefaultHeaders(),
      })
      .pipe(map(x => x), catchError(this.handleError));
  }

  // Método DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, {
        headers: this.getDefaultHeaders(),
      })
      .pipe(map(x => x), catchError(this.handleError));
  }

  // Tratamento de erros
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocorreu um erro inesperado.';
  
    if (error.status === 0) {
      errorMessage = 'Ops! Não foi possível se conectar ao servidor. Verifique sua internet ou se a API está rodando.';
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Apenas propaga, sem console.error()
  }
  
}
