import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { Negocio } from '../../interfaces/Negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private firestore: AngularFirestore) { }

  public set(negocio: Negocio) {
    return this.firestore
    .collection('negocio')
    .doc(negocio.negocioId.toString())
    .set(negocio);
  }

  public getAllActive() {
    return this.firestore.collection('negocio',ref => ref.where('estado', '==', ConstStatus.activo));
  }

  public getAll() {
    return this.firestore.collection('negocio');
  }

  public getOne(negocioId: string) {
    return this.firestore.collection('negocio').doc(negocioId);

  }

  public delete(negocio: Negocio) {
    return this.firestore
    .collection('negocio')
    .doc(negocio.negocioId.toString())
    .set(negocio);
  }
}
