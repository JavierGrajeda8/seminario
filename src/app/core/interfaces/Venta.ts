export interface Venta {
    ventaId: number;
    serieFactura: string;
    factura: string;
    fecha: Date;
    total: number;
    descripcion: string;
    nit: string;
    nombreCliente: string;
    estado: number;
}