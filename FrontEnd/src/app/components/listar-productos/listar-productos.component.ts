import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private toastr: ToastrService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
      console.log(this.productos);
    }, error => {
      console.log(error);
    });
  }

  deleteProducto(id: any) {
    this.productoService.deleteProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminadocon éxito', 'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    });
  }
}