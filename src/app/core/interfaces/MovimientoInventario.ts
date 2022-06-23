import { Inventario } from "./Inventario";
import { ProductoServicio } from "./ProductoServicio";
import { User } from "./User";

export interface MovimientoInventario {
    movimientoInventarioId: number;
    inventarioId: number;
    inventario?: Inventario;
    tipo: number;
    sku: string;
    producto?: ProductoServicio;
    cantidad: number;
    costo: number;
    fecha: Date;
    fechaMovimiento: Date;
    serieFactura: string;
    factura: string;
    estado: number;
}