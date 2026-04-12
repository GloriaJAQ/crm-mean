import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="notificaciones" titulo="Notificaciones" [campos]="campos" />`
})
export class NotificacionesComponent {
  campos: Campo[] = [
    { key: 'mensaje', label: 'Mensaje' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'fecha',   label: 'Fecha', type: 'date' }
  ];
}
