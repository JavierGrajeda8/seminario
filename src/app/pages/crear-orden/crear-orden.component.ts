import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Negocio } from 'src/app/core/interfaces/Negocio';
import {
  ProductoServicio,
  UnidadMedida,
} from 'src/app/core/interfaces/ProductoServicio';
import { Venta } from 'src/app/core/interfaces/Venta';
import { VentaDetalle } from 'src/app/core/interfaces/VentaDetalle';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { VentaService } from 'src/app/core/services/venta/venta.service';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.scss'],
})
export class CrearOrdenComponent implements OnInit {
  negocio: any;
  productos: ProductoServicio[] = [];
  ventas: Venta[] = [];
  viewDetail = false;
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

  mensaje = '';
  mensajeError = '';
  precioTotal = '';

  venta: Venta = {
    ventaId: Date.now(),
    negocioId: 0,
    serieFactura: '',
    factura: '',
    fecha: 0,
    total: 0,
    descripcion: '',
    nit: 'CF',
    nombreCliente: '',
    estado: 0,
    ventaDetalle: [],
  };

  fechaAux = { year: 0, month: 0, day: 0 };

  ventaDetalle: VentaDetalle = {
    ventaDetalleId: 0,
    ventaId: Date.now(),
    sku: '',
    descripcion: '',
    cantidad: 0,
    precioUnitario: 0,
    precioTotal: 0,
    descuento: 0,
    tipo: 0,
    estado: 0,
  };

  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private productoService: ProductoService,
    private ventaService: VentaService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.negocioService
        .getOne(params.negocioId)
        .valueChanges()
        .subscribe((data) => {
          this.negocio = data as Negocio;
          this.getProductos();
          this.getVentas();
        });
    });
    this.setUpDate();
  }

  ngOnInit(): void {}

  setUpDate() {
    const today = new Date(Date.now());

    this.fechaAux.year = today.getFullYear();
    this.fechaAux.month = today.getMonth() + 1;
    this.fechaAux.day = today.getDate();
  }

  newOrder(content: any) {
    this.viewDetail = false;
    this.clearAll();
    this.venta.ventaId = Date.now();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
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

  getVentas() {
    this.ventaService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.ventas = data as Venta[];
      });
  }

  getProductos() {
    this.productoService
      .getAll(this.negocio.negocioId.toString())
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

  cerrarMsj() {
    this.mensaje = '';
  }

  cerrarMsjError() {
    this.mensajeError = '';
  }

  changeProduct(evt: any) {
    this.productoC = this.productos.find(
      (p) => p.sku === this.ventaDetalle.sku
    ) as ProductoServicio;

    this.ventaDetalle.precioUnitario = this.productoC.precio;
  }

  cambioCantidad(evt: any) {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const subTotal =
      this.ventaDetalle.cantidad * this.ventaDetalle.precioUnitario;
    this.ventaDetalle.precioTotal =
      subTotal - subTotal * (this.ventaDetalle.descuento / 100);
  }

  addDetail() {
    const productoServicioAux = this.productos.find(
      (p) => p.sku === this.ventaDetalle.sku
    ) as ProductoServicio;

    const ventaDetalleAux: VentaDetalle = {
      ventaDetalleId: Date.now(),
      ventaId: this.venta.ventaId,
      sku: this.ventaDetalle.sku,
      descripcion: productoServicioAux.nombre,
      cantidad: this.ventaDetalle.cantidad,
      precioUnitario: this.ventaDetalle.precioUnitario,
      precioTotal: this.ventaDetalle.precioTotal,
      descuento: this.ventaDetalle.descuento,
      tipo: 1,
      estado: ConstStatus.activo,
    };

    this.venta.ventaDetalle?.push(ventaDetalleAux);
    this.calculateTotalSale();
    this.clearDetail();
  }

  removeDetail(i: number) {
    this.venta.ventaDetalle?.splice(i, 1);
    this.calculateTotalSale();
  }

  calculateTotalSale() {
    this.venta.total = parseFloat(
      this.venta.ventaDetalle
        ?.reduce((pSum, a) => pSum + a.precioTotal, 0)
        .toFixed(2)!
    );
  }

  clearAll() {
    this.clear();
    this.clearDetail();
  }

  clear() {
    this.venta.descripcion = '';
    this.venta.nombreCliente = '';
    this.venta.total = 0;
    this.venta.factura = '';
    this.venta.serieFactura = '';
    this.venta.nit = 'CF';
    this.venta.ventaDetalle = [];
    this.setUpDate();
  }

  clearDetail() {
    this.ventaDetalle.sku = '';
    this.ventaDetalle.cantidad = 0;
    this.ventaDetalle.precioUnitario = 0;
    this.ventaDetalle.precioTotal = 0;
    this.ventaDetalle.descuento = 0;
  }

  save() {
    const fechaSave = new Date(
      this.fechaAux.year,
      this.fechaAux.month,
      this.fechaAux.day
    ).getTime();
    this.venta.negocioId = this.negocio.negocioId;
    this.venta.estado = ConstStatus.abierta;
    this.venta.fecha = fechaSave;
    this.ventaService.set(this.venta).then(() => {
      this.mensaje = 'Orden guardada correctamente';
      this.clearAll();
    });
  }

  next(v: Venta) {
    if (v.estado === ConstStatus.abierta) {
      v.estado = ConstStatus.confirmado;
    } 

    this.ventaService.set(v).then(()=> {
      this.mensaje = 'Orden actualizada correctamente';
    });
  }

  detail(content: any, v: Venta) {
    this.viewDetail = true;
    this.clearAll();

    this.venta = v;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
          if (result === 'SaveClick') {
            this.save();
          }
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }
}
