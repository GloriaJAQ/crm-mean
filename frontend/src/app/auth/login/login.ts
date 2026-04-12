import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  email    = '';
  password = '';
  error    = '';
  loading  = false;
  showPass = false;

  constructor() {
    if (this.auth.isLogged()) this.router.navigate(['/dashboard']);
  }

  onLogin() {
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => { this.auth.saveSession(res); this.router.navigate(['/dashboard']); },
      error: (err) => { this.error = err.error?.msg || 'Error de conexión'; this.loading = false; }
    });
  }
}
