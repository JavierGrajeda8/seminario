import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Negocio } from 'src/app/core/interfaces/Negocio';
import {
  ProductoServicio,
  UnidadMedida,
} from 'src/app/core/interfaces/ProductoServicio';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  negocio: any;

  mensaje = '';
  mensajeError = '';

  productos: any;

  sku: string = '';
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  costo: number = 0;
  unidadMedida: any = 'un';
  tipo: number = 1;
  negocioId: number = 0;
  estado: boolean = true;

  unidadesMedida: Array<string>;

  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.negocioService
        .getOne(params.negocioId)
        .valueChanges()
        .subscribe((data) => {
          this.negocio = data as Negocio;
          this.getProductos();
        });
    });

    this.unidadesMedida = Object.keys(UnidadMedida).filter((key) =>
      isNaN(+key)
    );
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  getProductos() {
    this.productoService.getAll(this.negocio.negocioId.toString()).valueChanges().subscribe((data)=> {
      this.productos = data as ProductoService[];
    });
  }

  save() {
    if (this.sku.length > 0 && this.nombre.length > 0) {
      this.mensajeError = '';
      const ProductoServicio: ProductoServicio = {
        sku: this.sku,
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        costo: this.costo,
        unidadMedida: this.unidadMedida,
        tipo: this.tipo,
        negocioId: this.negocio.negocioId,
        negocio: this.negocio,
        estado: this.estado ? ConstStatus.activo : ConstStatus.inactivo,
      };

      this.productoService.set(ProductoServicio).then(() => {
        this.clean();
        this.mensaje = ProductoServicio.nombre + ' guardado correctamente.';
      });

    } else {
      this.mensaje = '';
      this.mensajeError =
        'Por favor completa todos los campos que tengan asterisco (*)';
    }
  }

  edit(producto: ProductoServicio) {
    this.sku = producto.sku;
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.costo = producto.precio;
    this.unidadMedida = producto.unidadMedida;
    this.tipo = producto.tipo;
    this.estado = producto.estado === ConstStatus.activo ? true : false;

  }

  generarSKU() {
    this.sku = Math.random().toString(36).slice(4).toUpperCase();
  }

  clean() {
    this.sku = '';
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.costo = 0;
    this.unidadMedida = 'un';
    this.tipo = 1;
    this.negocioId = 0;
    this.estado = true;
  }

  cerrarMsj() {
    this.mensaje = '';
  }

  cerrarMsjError() {
    this.mensajeError = '';
  }
}
