import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}