import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(private productoService: ProductoService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  createProducto() {
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if (this.id !== null) {
      //updateProducto
      this.productoService.updateProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastMessage('Producto actualizado exitosamente!', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      });
    } else {
      //createProducto
      this.productoService.createProducto(PRODUCTO).subscribe(data => {

        this.toastMessage('Producto creado exitosamente!', 'Producto Registrado');
        
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this.productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }

  toastMessage(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 2500
    });
  }
}