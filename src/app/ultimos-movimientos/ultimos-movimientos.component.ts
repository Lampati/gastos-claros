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
    this.fireStoreService.getMovimientos().subscribe((movimientosSnap) => {
      this.ultimosMovimientos = [];
      movimientosSnap.forEach((data: any) => {
        const mov = new Movimiento()
        mov.anio = data.anio;
        mov.fecha = data.fecha.toDate() ;
        mov.usuario = data.usuario;
        mov.tipo = data.tipo;
        mov.nombre = data.nombre;
        mov.monto = data.monto;

        this.ultimosMovimientos.push(mov);
      })
    });
  }

}
