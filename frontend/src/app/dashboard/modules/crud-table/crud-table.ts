import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ApiService } from '../../../services/api';
import { AuthService } from '../../../services/auth';

export interface Campo { key: string; label: string; type?: string; options?: string[]; }

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, SlicePipe],
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css']
})
export class CrudTableComponent implements OnInit {
  @Input() coleccion = '';
  @Input() titulo    = '';
  @Input() campos: Campo[] = [];

  private api  = inject(ApiService);
  private auth = inject(AuthService);

  items    : any[] = [];
  filtered : any[] = [];
  search   = '';
  loading  = false;
  error    = '';
  success  = '';
  showModal = false;
  isEditing = false;
  form: any = {};
  editId    = '';
  canWrite  = false;
  canDelete = false;

  ngOnInit() {
    this.canWrite  = this.auth.isUser();
    this.canDelete = this.auth.isAdmin();
    this.load();
  }

  load() {
    this.loading = true; this.error = '';
    this.api.getAll(this.coleccion).subscribe({
      next:  (d) => { this.items = this.filtered = d; this.loading = false; },
      error: (e) => { this.error = e.error?.msg || 'Error al cargar'; this.loading = false; }
    });
  }

  onSearch() {
    const q = this.search.toLowerCase();
    this.filtered = q ? this.items.filter(i => JSON.stringify(i).toLowerCase().includes(q)) : [...this.items];
  }

  openCreate() {
    this.isEditing = false; this.editId = '';
    this.form = Object.fromEntries(this.campos.map(c => [c.key, '']));
    this.showModal = true; this.error = '';
  }

  openEdit(item: any) {
    this.isEditing = true; this.editId = item._id;
    this.form = { ...item };
    this.showModal = true; this.error = '';
  }

  save() {
    const obs = this.isEditing
      ? this.api.update(this.coleccion, this.editId, this.form)
      : this.api.create(this.coleccion, this.form);
    obs.subscribe({
      next: () => { this.showModal = false; this.load(); this.flash(this.isEditing ? 'Actualizado ✅' : 'Creado ✅'); },
      error: (e) => { this.error = e.error?.msg || 'Error al guardar'; }
    });
  }

  delete(id: string) {
    if (!confirm('¿Eliminar este registro?')) return;
    this.api.delete(this.coleccion, id).subscribe({
      next: () => { this.load(); this.flash('Eliminado ✅'); },
      error: (e) => { this.error = e.error?.msg || 'Error al eliminar'; }
    });
  }

  flash(msg: string) { this.success = msg; setTimeout(() => this.success = '', 3000); }

  val(item: any, key: string): string {
    const v = item[key];
    if (v == null || v === '') return '—';
    if (key === 'createdAt' || key === 'fecha') return new Date(v).toLocaleDateString('es');
    return String(v);
  }

  closeModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showModal = false;
  }
}
