import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movimiento } from '../_models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  //Crea un nuevo gato
  public crearMovimiento(data: Movimiento) {
    return this.firestore.collection('movimientos').add(data);
  }

  //Obtiene un gato
  public deleteMovimiento(documentId: string) {
    return this.firestore.collection('movimientos').doc(documentId).delete();
  }


  //Obtiene todos los gatos
  public getMovimientos() {
    return this.firestore.collection('movimientos').valueChanges();
  }

  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }
}
