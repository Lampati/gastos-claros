import { Component, OnInit } from '@angular/core';
import { Tipo } from '../_models/tipo';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-resumen-movimientos',
  templateUrl: './resumen-movimientos.component.html',
  styleUrls: ['./resumen-movimientos.component.scss']
})
export class ResumenMovimientosComponent implements OnInit {

  tipos: Tipo[] = [];
  movimientos: Movimiento[] = [];
  
  constructor(   private fireStoreService: FirestoreService) { }

  ngOnInit() {
    this.fireStoreService.getMovimientosDelAnio(2019).subscribe((elementos) => {
      this.movimientos = elementos;

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
    });
    
  }

  getTotalMes(mes:number, tipo: Tipo) : number{
    var total = 0;

    this.movimientos.filter (x => x.mes == mes && x.tipo == tipo.nombre).forEach(element => {
      total += element.monto;
    });

    return total;
  }

  getTotal( tipo: Tipo) : number{
    var total = 0;

    this.movimientos.filter (x =>x.tipo == tipo.nombre).forEach(element => {
      total += element.monto;
    });

    return total;
  }

}
