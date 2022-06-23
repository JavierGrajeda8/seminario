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
  fechaMovimiento = { year: 2022, month: 6, day: 22 };
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
        });
    });
    this.inventario = [];
  }

  ngOnInit(): void {}

  getInventario() {
    this.inventarioService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.inventario = data as Inventario[];
      });
  }

  getProductos() {
    this.productoService
      .getAllProductType(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.productos = data as ProductoServicio[];
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

  save() {}

  clean() {}

  edit(movimientoInventario: MovimientoInventario) {}

  delete(movimientoInventario: MovimientoInventario) {}

  cerrarMsj() {}

  cerrarMsjError() {}

  addProduct() {
    const movimientoInventarioAux: MovimientoInventario = {
      movimientoInventarioId: Date.now(),
      inventarioId: this.inventarioId,
      tipo: this.tipoMovimientoInventario,
      sku: this.producto!,
      producto: this.productos.find(
        (p) => p.sku === this.producto
      ) as ProductoServicio,
      cantidad: this.cantidad,
      costo: this.costo,
      fecha: new Date(Date.now()),
      fechaMovimiento: new Date(
        this.fechaMovimiento.year,
        this.fechaMovimiento.month,
        this.fechaMovimiento.day
      ),
      serieFactura: this.serieFactura,
      factura: this.factura,
      estado: ConstStatus.activo,
    };
    this.movimientoInventario.push(movimientoInventarioAux);
  }

  changeProduct(evt: any) {
    this.productoC = this.productos.find(
      (p) => p.sku === this.producto
    ) as ProductoServicio;
  }
}
