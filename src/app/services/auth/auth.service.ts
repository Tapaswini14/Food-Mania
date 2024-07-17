import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private _http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  loginUser(userData: any): Observable<any> {
    const loginUrl = `http://localhost:5000/users`;
    this.setToken('abcdefghijklmnopqrstuvwxyz');
    return this._http.post(loginUrl, userData);
  }

  registerUser(userData: any): Observable<any> {
    const registerUrl = `http://localhost:5000/register`;
    return this._http.post(registerUrl, userData);
  }

  getRecipes(): Observable<any> {
    const recipesUrl = `http://localhost:5000/recipes-List`;
    return this._http.get(recipesUrl);
  }

  getEachRecipes(id: any): Observable<any> {
    const eachRecipesUrl = `http://localhost:5000/eachRecipe/${id}`;
    return this._http.get(eachRecipesUrl);
  }
}
