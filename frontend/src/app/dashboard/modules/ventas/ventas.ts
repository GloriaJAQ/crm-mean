import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="ventas" titulo="Ventas" [campos]="campos" />`
})
export class VentasComponent {
  campos: Campo[] = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'usuario', label: 'Usuario' },
    { key: 'total',   label: 'Total', type: 'number' },
    { key: 'fecha',   label: 'Fecha', type: 'date' }
  ];
}
