import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  private auth = inject(AuthService);
  form    = { nombre: '', email: '', password: '', rol: 'user' };
  error   = '';
  success = '';
  loading = false;

  onRegister() {
    this.loading = true; this.error = ''; this.success = '';
    this.auth.register(this.form).subscribe({
      next: () => {
        this.success = '¡Cuenta creada! Ahora puedes iniciar sesión.';
        this.form    = { nombre: '', email: '', password: '', rol: 'user' };
        this.loading = false;
      },
      error: (err) => { this.error = err.error?.msg || 'Error al registrar'; this.loading = false; }
    });
  }
}
