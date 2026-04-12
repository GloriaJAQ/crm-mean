import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="users" titulo="Usuarios" [campos]="campos" />`
})
export class UsuariosComponent {
  campos: Campo[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'email',  label: 'Email', type: 'email' },
    { key: 'rol',    label: 'Rol', options: ['admin', 'user', 'guest'] }
  ];
}
