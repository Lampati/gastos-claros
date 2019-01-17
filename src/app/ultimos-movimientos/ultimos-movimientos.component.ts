import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-ultimos-movimientos',
  templateUrl: './ultimos-movimientos.component.html',
  styleUrls: ['./ultimos-movimientos.component.scss']
})
export class UltimosMovimientosComponent implements OnInit {

  constructor(
    private fireStoreService: FirestoreService
  ) { }

  ultimosMovimientos: Movimiento[] = [];

  ngOnInit() {

    this.fireStoreService.getUltimosMovimientos(10).subscribe((movimientosSnap) => {
        this.ultimosMovimientos = [];      
        
        movimientosSnap.forEach((snap: any) => {
          const data = snap.payload.doc.data() ;

          const mov = new Movimiento()
          mov.anio = data.anio;
          mov.mes = data.mes;          
          mov.fecha = data.fecha.toDate() ;
          mov.usuario = data.usuario;
          mov.tipo = data.tipo;
          mov.nombre = data.nombre;
          mov.monto = data.monto;
          mov.documentId = snap.payload.doc.id;

          this.ultimosMovimientos.push(mov);
        })
      }
    ); 

  }

  onEliminarClick(event, item){
    this.fireStoreService.deleteMovimiento(item.documentId).then(function() {
  }).catch(function(error) {
  });
  }
}
