import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getAll(col: string, search = '') {
    let params = new HttpParams();
    if (search) params = params.set('q', search);
    return this.http.get<any[]>(`${this.base}/${col}`, { params });
  }
  create(col: string, data: any)             { return this.http.post<any>(`${this.base}/${col}`, data); }
  update(col: string, id: string, data: any) { return this.http.put<any>(`${this.base}/${col}/${id}`, data); }
  delete(col: string, id: string)            { return this.http.delete<any>(`${this.base}/${col}/${id}`); }
}
