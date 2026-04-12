import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, NgIf, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private auth = inject(AuthService);

  menuOpen = false;
  nombre   = this.auth.getNombre();
  rol      = this.auth.getRol();

  menuItems = [
    { path: 'clientes',       label: 'Clientes',       icon: '👥' },
    { path: 'productos',      label: 'Productos',      icon: '📦' },
    { path: 'ventas',         label: 'Ventas',         icon: '💰' },
    { path: 'actividades',    label: 'Actividades',    icon: '📋' },
    { path: 'tickets',        label: 'Tickets',        icon: '🎫' },
    { path: 'notificaciones', label: 'Notificaciones', icon: '🔔' },
    { path: 'usuarios',       label: 'Usuarios',       icon: '👤' },
  ];

  logout() { this.auth.logout(); }
}
