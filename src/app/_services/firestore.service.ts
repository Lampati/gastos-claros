import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Movimiento } from '../_models/movimiento';
import { map } from 'rxjs/operators';

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


  public getUltimosMovimientos(cantidad: number) {
    if (cantidad){
      return this.firestore.collection('movimientos',ref => ref.orderBy('fecha','desc').limit(cantidad)).snapshotChanges();
    }else{
      return this.firestore.collection('movimientos',ref => ref.orderBy('fecha','desc')).snapshotChanges();
    }
  }

  public getMovimientosDelAnio(anio: number) {
    return this.firestore.collection('movimientos', ref => ref.where('anio','==',anio)).valueChanges().
      pipe(
        map(response => {
          const elementos:  Movimiento[] = [];
          response.forEach((data: any) => {
            const mov = new Movimiento()
            mov.anio = data.anio;
            mov.mes = data.mes;            
            mov.fecha = data.fecha.toDate() ;
            mov.usuario = data.usuario;
            mov.tipo = data.tipo;
            mov.nombre = data.nombre;
            mov.monto = data.monto;
    
            elementos.push(mov);
          }          
        ) 
        return elementos;
        })
    );
  }

  public getMovimientosDelMesAnio(anio: number, mes: number) {
    return this.firestore.collection('movimientos', ref => ref.where('anio','==',anio).where('mes','==',mes)).valueChanges().
      pipe(
        map(response => {
          const elementos:  Movimiento[] = [];
          response.forEach((data: any) => {
            const mov = new Movimiento()
            mov.anio = data.anio;
            mov.mes = data.mes;            
            mov.fecha = data.fecha.toDate() ;
            mov.usuario = data.usuario;
            mov.tipo = data.tipo;
            mov.nombre = data.nombre;
            mov.monto = data.monto;
    
            elementos.push(mov);
          }          
        ) 
        return elementos;
        })
    );
  }

  public getTipos() {
    return this.firestore.collection('tipos', ref => ref.orderBy('orden')).valueChanges();
  }

  public crearBanco(data: any) {
    return this.firestore.collection('bancos').add(data);
  }

  public deleteBanco(documentId: string) {
    return this.firestore.collection('bancos').doc(documentId).delete();
  }

  public getBancos() {
    return this.firestore.collection('bancos',ref => ref.orderBy('anio','desc').orderBy('mes','desc')).snapshotChanges();
  }

}
