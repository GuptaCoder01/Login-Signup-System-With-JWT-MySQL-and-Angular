import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: { email: string; password: string; }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {

        localStorage.setItem('authToken', response.token);
      })
    );
  }

  register(user: { email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getDashboard(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found in localStorage!');
      return throwError(() => new Error('No token found.'));
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.apiUrl}/dashboard`, { headers });
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  };

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

