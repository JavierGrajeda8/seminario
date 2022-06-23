import { Venta } from "./Venta";

export interface VentaDetalle {
    ventaDetalleId: number;
    ventaId: number;
    venta?: Venta;
    sku: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    precioTotal: number;
    descuento: number;
    tipo: number;
    estado: number;
}