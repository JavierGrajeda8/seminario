import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Inventario } from 'src/app/core/interfaces/Inventario';
import { MovimientoInventario } from 'src/app/core/interfaces/MovimientoInventario';
import { Negocio } from 'src/app/core/interfaces/Negocio';
import {
  ProductoServicio,
  UnidadMedida,
} from 'src/app/core/interfaces/ProductoServicio';
import { InventarioService } from 'src/app/core/services/inventario/inventario.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  negocio: any;
  productos: ProductoServicio[] = [];
  productoC: ProductoServicio = {
    sku: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    costo: 0,
    unidadMedida: UnidadMedida.unindad,
    tipo: 0,
    negocioId: 0,
    estado: ConstStatus.activo,
  };
  inventario: Inventario[];

  mensaje = '';
  mensajeError = '';

  inventarioId = 0;
  sku = '';
  cantidad = 0;
  estado = 0;

  movimientoInventario: MovimientoInventario[] = [];
  movimientoInventarioId = '';
  tipoMovimientoInventario = 1;
  producto? = '';
  fecha = '';
  fechaMovimiento = { year: 2022, month: 6, day: 20 };
  serieFactura = '';
  factura = '';
  costo = 0.0;
  usuario = '';
  model: any;
  date: { year: number; month: number } = { year: 0, month: 0 };

  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private router: Router,
    private inventarioService: InventarioService,
    private productoService: ProductoService,
    private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.negocioService
        .getOne(params.negocioId)
        .valueChanges()
        .subscribe((data) => {
          this.negocio = data as Negocio;
          this.getProductos();
          this.getInventario();
        });
    });
    this.inventario = [];
    this.setUpDate();
  }

  ngOnInit(): void {}

  setUpDate() {
    const today = new Date(Date.now());

    this.fechaMovimiento.year = today.getFullYear();
    this.fechaMovimiento.month = today.getMonth() + 1;
    this.fechaMovimiento.day = today.getDate();
  }

  getInventario() {
    this.inventarioService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.inventario = data as Inventario[];
        console.log('inventario', this.inventario);
      });
  }

  getProductos() {
    this.productoService
      .getAllProductType(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.productos = data as ProductoServicio[];
        if (this.productos.length == 0) {
          this.mensajeError =
            'El giro de negocio no tiene productos asociados.';
        } else {
          this.mensajeError = '';
        }
      });
  }

  newInvetory(content: any) {
    this.movimientoInventarioId = Date.now().toString();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
          console.log(this.fechaMovimiento);
          if (result === 'SaveClick') {
            this.save();
          }
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  clean() {
    this.tipoMovimientoInventario = 1;
    this.producto = '';
    this.fecha = '';
    this.serieFactura = '';
    this.factura = '';
    this.costo = 0.0;
    this.cantidad = 0;
    this.setUpDate();
  }

  edit(inventario: Inventario) {
    inventario.edit = !inventario.edit;
  }

  detail(detalle: any, inventario: Inventario) {
    const sub = this.inventarioService
      .getAllMovimiento(
        this.negocio.negocioId.toString(),
        inventario.inventarioId.toString()
      )
      .valueChanges()
      .subscribe((data) => {
        this.movimientoInventario = data as MovimientoInventario[];
        this.modalService
          .open(detalle, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
          .result.then(
            (result) => {
              console.log(`Closed with: ${result}`);
              sub.unsubscribe();
            },
            (reason) => {
              sub.unsubscribe();
              console.log(`Dismissed ${this.getDismissReason(reason)}`);
            }
          );
      });
  }

  saveDetail(i: Inventario) {
    const inputAux = document.getElementById(
      'cantidad_' + i.sku
    ) as HTMLInputElement;
    console.log(i.sku);
    console.log(inputAux.value);
    i.cantidad = parseFloat(inputAux.value);
    i.edit =  false;
    this.inventarioService.set(i);
    this.mensaje = `Inventario de ${i.Producto.nombre} modificado correctamente.`;

  }

  delete(movimientoInventario: MovimientoInventario) {}

  cerrarMsj() {
    this.mensaje = '';
  }

  cerrarMsjError() {
    this.mensajeError = '';
  }

  save() {
    const inventarioAux = this.inventario.find((i) => i.sku === this.producto);
    const productoServicioAux = this.productos.find(
      (p) => p.sku === this.producto
    ) as ProductoServicio;

    console.log('inventarioAux', inventarioAux);

    const inventario: Inventario = {
      inventarioId: inventarioAux ? inventarioAux.inventarioId : Date.now(),
      sku: this.producto!,
      Producto: productoServicioAux,
      cantidad: inventarioAux
        ? this.cantidad + inventarioAux.cantidad
        : this.cantidad,
      negocioId: this.negocio.negocioId,
      negocio: this.negocio as Negocio,
      estado: ConstStatus.activo,
    };

    const movimientoInventarioAux: MovimientoInventario = {
      movimientoInventarioId: Date.now(),
      inventarioId: this.inventarioId,
      inventario: inventario,
      tipo: this.tipoMovimientoInventario,
      sku: this.producto!,
      producto: productoServicioAux,
      cantidad: this.cantidad,
      costo: this.costo,
      fecha: Date.now(),
      fechaMovimiento: (new Date(
        this.fechaMovimiento.year,
        this.fechaMovimiento.month,
        this.fechaMovimiento.day
      )).getTime(),
      serieFactura: this.serieFactura,
      factura: this.factura,
      estado: ConstStatus.activo,
    };

    this.inventarioService.set(inventario).then(() => {
      this.inventarioService.setMovimiento(movimientoInventarioAux).then(() => {
        this.mensaje = `${this.cantidad} ${productoServicioAux.unidadMedida} de ${productoServicioAux.nombre} agregados a inventario.`;
        this.clean();
      });
    });
  }

  changeProduct(evt: any) {
    this.productoC = this.productos.find(
      (p) => p.sku === this.producto
    ) as ProductoServicio;
  }
}
