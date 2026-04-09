import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, { email, password });
  }

  register(data: any) {
    return this.http.post<any>(`${this.api}/auth/register`, data);
  }

  saveSession(data: any) {
    localStorage.setItem('token',  data.token);
    localStorage.setItem('rol',    data.rol);
    localStorage.setItem('nombre', data.nombre);
    localStorage.setItem('email',  data.email);
  }

  getToken()  { return localStorage.getItem('token'); }
  getRol()    { return localStorage.getItem('rol'); }
  getNombre() { return localStorage.getItem('nombre'); }
  isLogged()  { return !!this.getToken(); }
  isAdmin()   { return this.getRol() === 'admin'; }
  isUser()    { return ['admin','user'].includes(this.getRol() || ''); }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
