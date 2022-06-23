import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConstStatus } from '../../constants/constStatus';
import { ProductoServicio } from '../../interfaces/ProductoServicio';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore: AngularFirestore) {

   }

   public set(producto: ProductoServicio) {
    return this.firestore
    .collection('negocio')
    .doc(producto.negocioId.toString())
    .collection('producto')
    .doc(producto.sku.toString())
    .set(producto);
  }

  public getAllActive(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('producto',ref => ref.where('tipo', '==', '1'));
  }

  public getAllProductType(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('producto',ref => ref.where('estado', '==', ConstStatus.activo));
  }

  public getAll(negocioId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('producto');
  }

  public getOne(negocioId: string, productoId: string) {
    return this.firestore
    .collection('negocio')
    .doc(negocioId)
    .collection('producto')
    .doc(productoId)

  }

  public delete(negocioId: string, producto: ProductoServicio) {
    return this.firestore
    .collection('producto')
    .doc(negocioId)
    .collection('producto')
    .doc(producto.negocioId.toString())
    .set(producto);
  }
  
}
