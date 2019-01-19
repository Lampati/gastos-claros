import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../_services/firestore.service';
import { Tipo } from '../_models/tipo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(   private fireStoreService: FirestoreService) { }

  tipos: Tipo[] = [];

  ngOnInit() {
    this.fireStoreService.getTipos().subscribe((movimientosSnap) => {
      this.tipos = [];
      movimientosSnap.forEach((data: any) => {
        const tipo = new Tipo()
        tipo.nombre = data.nombre;
        tipo.resta = data.resta;
        tipo.orden = data.orden;
        this.tipos.push(tipo);
      })
    });
  }


}
