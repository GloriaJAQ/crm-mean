import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'clientes', pathMatch: 'full' },
      { path: 'clientes',       loadComponent: () => import('./dashboard/modules/clientes/clientes.component').then(m => m.ClientesComponent) },
      { path: 'productos',      loadComponent: () => import('./dashboard/modules/productos/productos.component').then(m => m.ProductosComponent) },
      { path: 'ventas',         loadComponent: () => import('./dashboard/modules/ventas/ventas.component').then(m => m.VentasComponent) },
      { path: 'actividades',    loadComponent: () => import('./dashboard/modules/actividades/actividades.component').then(m => m.ActividadesComponent) },
      { path: 'tickets',        loadComponent: () => import('./dashboard/modules/tickets/tickets.component').then(m => m.TicketsComponent) },
      { path: 'notificaciones', loadComponent: () => import('./dashboard/modules/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent) },
      { path: 'usuarios',       loadComponent: () => import('./dashboard/modules/usuarios/usuarios.component').then(m => m.UsuariosComponent) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
