import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="productos" titulo="Productos" [campos]="campos" />`
})
export class ProductosComponent {
  campos: Campo[] = [
    { key: 'nombre',      label: 'Nombre' },
    { key: 'precio',      label: 'Precio', type: 'number' },
    { key: 'descripcion', label: 'Descripción' }
  ];
}
