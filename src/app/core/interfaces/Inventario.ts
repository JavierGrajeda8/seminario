import { Negocio } from "./Negocio";
import { ProductoServicio } from "./ProductoServicio";

export interface Inventario {
    inventarioId: number;
    sku: string;
    Producto: ProductoServicio;
    cantidad: number;
    negocioId: number;
    negocio?: Negocio;
    estado: number;
}