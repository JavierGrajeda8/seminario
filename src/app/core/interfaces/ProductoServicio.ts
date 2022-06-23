import { Negocio } from "./Negocio";

export enum UnidadMedida {
    unindad = 'unidad',
    libra = 'libra',
    centimetro = 'camión',
    kilogramo = 'kilogramo',
    metro = 'metro',
    caja = 'caja',
    camion = 'camion'
}

export interface ProductoServicio {
    sku: string;
    nombre: string;
    descripcion: string;
    precio: number;
    costo: number;
    unidadMedida: UnidadMedida;
    tipo: number;
    negocioId: number;
    negocio?: Negocio;
    estado: number;
}
