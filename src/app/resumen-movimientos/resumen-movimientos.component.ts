import { Component, OnInit } from '@angular/core';
import { Tipo } from '../_models/tipo';
import { FirestoreService } from '../_services/firestore.service';

@Component({
  selector: 'app-resumen-movimientos',
  templateUrl: './resumen-movimientos.component.html',
  styleUrls: ['./resumen-movimientos.component.scss']
})
export class ResumenMovimientosComponent implements OnInit {

  tipos: Tipo[] = [];
  
  constructor(   private fireStoreService: FirestoreService) { }

  ngOnInit() {
    this.fireStoreService.getTipos().subscribe((movimientosSnap) => {
      this.tipos = [];
      movimientosSnap.forEach((data: any) => {
        const tipo = new Tipo()
        tipo.nombre = data.nombre;
        this.tipos.push(tipo);
      })
    });
  }

}
