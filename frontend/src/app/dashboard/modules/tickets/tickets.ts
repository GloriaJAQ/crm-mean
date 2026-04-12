import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="tickets" titulo="Tickets de Soporte" [campos]="campos" />`
})
export class TicketsComponent {
  campos: Campo[] = [
    { key: 'cliente',  label: 'Cliente' },
    { key: 'problema', label: 'Problema' },
    { key: 'estado',   label: 'Estado', options: ['abierto', 'en proceso', 'cerrado'] }
  ];
}
