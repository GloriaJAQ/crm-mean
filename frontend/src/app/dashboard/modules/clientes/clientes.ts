import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="clientes" titulo="Clientes" [campos]="campos" />`
})
export class ClientesComponent {
  campos: Campo[] = [
    { key: 'nombre',   label: 'Nombre' },
    { key: 'empresa',  label: 'Empresa' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'correo',   label: 'Correo', type: 'email' }
  ];
}
