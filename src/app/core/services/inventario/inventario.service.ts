import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Inventario } from '../../interfaces/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private firestore: AngularFirestore) { }

  public set(inventario: Inventario) {
    return this.firestore
    .collection('negocio')
    .doc(inventario.negocioId.toString())
    .collection('inventario')
    .doc(inventario.inventarioId.toString())
    .set(inventario);
  }

  public getAllActive(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('inventario',ref => ref.where('estado', '==', ConstStatus.activo));
  }

  public getAll(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('inventario');
  }

  public getOne(negocioId: string, inventarioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('inventario')
    .doc(inventarioId)

  }

  public delete(negocioId: string, inventario: Inventario) {
    return this.firestore
    .collection('producto')
    .doc(negocioId)
    .collection('inventario')
    .doc(inventario.inventarioId.toString())
    .set(inventario);
  }
}
