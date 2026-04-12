import { Component } from '@angular/core';
import { CrudTableComponent, Campo } from '../crud-table/crud-table.component';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CrudTableComponent],
  template: `<app-crud-table coleccion="actividades" titulo="Actividades" [campos]="campos" />`
})
export class ActividadesComponent {
  campos: Campo[] = [
    { key: 'tipo',        label: 'Tipo' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'responsable', label: 'Responsable' }
  ];
}
