import { VentaDetalle } from "./VentaDetalle";

export interface Venta {
    ventaId: number;
    negocioId: number;
    serieFactura: string;
    factura: string;
    fecha: number;
    total: number;
    descripcion: string;
    nit: string;
    nombreCliente: string;
    estado: number;
    ventaDetalle?: VentaDetalle[];
}