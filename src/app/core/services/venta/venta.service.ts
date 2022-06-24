import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Venta } from '../../interfaces/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private firestore: AngularFirestore) { }


  public set(venta: Venta) {
    return this.firestore
    .collection('negocio')
    .doc(venta.negocioId.toString())
    .collection('venta')
    .doc(venta.ventaId.toString())
    .set(venta);
  }

  public getAllActive(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('venta',ref => ref.where('estado', '==', ConstStatus.activo));
  }

  public getAllByStatus(negocioId: string, status: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('venta',ref => ref.where('estado', '==', status));
  }


  public getAll(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('venta');
  }

  public getOne(negocioId: string, ventaId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('venta')
    .doc(ventaId)

  }

  public delete(negocioId: string, venta: Venta) {
    return this.firestore
    .collection('producto')
    .doc(negocioId)
    .collection('venta')
    .doc(venta.ventaId.toString())
    .set(venta);
  }
}
