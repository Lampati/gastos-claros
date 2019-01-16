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

  public crearMovimiento(data: any) {
    return this.firestore.collection('movimientos').add(data);
  }

  public deleteMovimiento(documentId: string) {
    return this.firestore.collection('movimientos').doc(documentId).delete();
  }


  public getMovimientos() {
    return this.firestore.collection('movimientos').valueChanges();
  }

  public getTipos() {
    return this.firestore.collection('tipos').valueChanges();
  }
}
