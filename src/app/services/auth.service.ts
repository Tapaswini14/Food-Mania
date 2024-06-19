import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private _http: HttpClient) {}

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['login']);
  // }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin@gmail.com' && password === 'admin123') {
  //     this.setToken('abcdefghijklmnopqrstuvwxyz');
  //     return of({ name: 'Tarique Akhtar', email: 'admin@gmail.com' });
  //   }
  //   return throwError(new Error('Failed to login'));
  // }

  setToken(token: string) {
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 60); // Expire after 30 minutes
    localStorage.setItem('token', token);
    localStorage.setItem('expiryTime', expiryTime.toString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    const expiryTimeString = localStorage.getItem('expiryTime');
    if (!token || !expiryTimeString) {
      this.logout(); // Token or expiry time is missing, log the user out
      return null;
    }
    const expiryTime = new Date(expiryTimeString);
    const currentTime = new Date();
    if (expiryTime < currentTime) {
      this.logout(); // Token has expired, log the user out
      return null;
    }
    return token;
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      const name = 'Admin';
      localStorage.setItem('Name', name);
      return of({ name: 'Admin', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }

  // getRecipes(): Observable<any> {
  //   const recipesListUrl = `https://dummyjson.com/recipes`;
  //   const authToken = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${authToken}`
  //   );
  //   return this._http.get(recipesListUrl, { headers });
  // }
}
