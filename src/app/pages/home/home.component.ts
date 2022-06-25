import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Inventario } from 'src/app/core/interfaces/Inventario';
import { Negocio } from 'src/app/core/interfaces/Negocio';
import { ProductoServicio } from 'src/app/core/interfaces/ProductoServicio';
import { Venta } from 'src/app/core/interfaces/Venta';
import { InventarioService } from 'src/app/core/services/inventario/inventario.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { VentaService } from 'src/app/core/services/venta/venta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  negocio: any;
  ventasAll: Venta[] = [];
  productos: ProductoServicio[]= [];
  inventario: Inventario[] = [];

  OrdenAbierta = 0;
  OrdenConfirmado = 0;
  OrdenEliminado = 0;
  OrdenTransito = 0;
  OrdenEntregada = 0;
  OrdenRechazada = 0;

  cantidadProductos = 0;
  cantidadServicios = 0;
  cantidadMixtos = 0;
  
  constructor(
    private negocioService: NegocioService,
    private route: ActivatedRoute,
    private ventaService: VentaService,
    private productoService: ProductoService,
    private inventarioService: InventarioService
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.negocioService
        .getOne(params.negocioId)
        .valueChanges()
        .subscribe((data) => {
          this.negocio = data as Negocio;
          this.getProductos();
          this.getInventario();
          this.getVentas();
        });
    });
  }

  ngOnInit(): void {}

  getVentas() {
    this.ventaService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.ventasAll = data as Venta[];

        this.OrdenAbierta = this.ventasAll.filter((v) => v.estado === ConstStatus.abierta).length;
        this.OrdenConfirmado = this.ventasAll.filter((v) => v.estado === ConstStatus.confirmado).length;
        this.OrdenEliminado = this.ventasAll.filter((v) => v.estado === ConstStatus.eliminado).length;
        this.OrdenTransito = this.ventasAll.filter((v) => v.estado === ConstStatus.transito).length;
        this.OrdenEntregada = this.ventasAll.filter((v) => v.estado === ConstStatus.entregada).length;
        this.OrdenRechazada = this.ventasAll.filter((v) => v.estado === ConstStatus.rechazada).length;
      });
  }

  getProductos() {
    this.productoService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.productos = data as ProductoServicio[];
        
        this.cantidadProductos = this.productos.filter((v) => v.tipo == 1).length;
        this.cantidadServicios = this.productos.filter((v) => v.tipo == 2).length;
        this.cantidadMixtos = this.productos.filter((v) => v.tipo == 3).length;
      });
  }

  getInventario() {
    this.inventarioService
      .getAll(this.negocio.negocioId.toString())
      .valueChanges()
      .subscribe((data) => {
        this.inventario = data as Inventario[];
      });
  }
}
