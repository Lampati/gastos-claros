import { Component, OnInit, Input } from '@angular/core';
import { Tipo } from '../_models/tipo';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-resumen-movimientos',
  templateUrl: './resumen-movimientos.component.html',
  styleUrls: ['./resumen-movimientos.component.scss']
})
export class ResumenMovimientosComponent implements OnInit {

  @Input()
  tipos: Tipo[] = [];
  
  movimientos: Movimiento[] = [];

  constructor(   private fireStoreService: FirestoreService) { }


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

  getMovimientosFiltrados(movimientosFiltrados: Movimiento[]){
    this.movimientos = movimientosFiltrados;
  }

  getBalanceMesActual( ) : number{
    var mesActual = new Date().getMonth() + 1
    var total = 0;

    this.movimientos.filter (x =>x.mes == mesActual).forEach(element => {
      if (this.tipos.find(x => x.nombre == element.tipo).resta){
        total -= element.monto;
      }else{
        total += element.monto;
      }
    });

    return total;
  }

  getTotalMesTipo(mes:number, tipo: Tipo) : number{
    var total = 0;

    this.movimientos.filter (x => x.mes == mes && x.tipo == tipo.nombre).forEach(element => {
      total += element.monto;
    });

    return total;
  }

  getTotalMes(mes:number) : number{
    var total = 0;

    this.movimientos.filter (x => x.mes == mes ).forEach(element => {
      total += element.monto;
    });

    return total;
  }

  getTotalTipo( tipo: Tipo) : number{
    var total = 0;

    this.movimientos.filter (x =>x.tipo == tipo.nombre).forEach(element => {
      total += element.monto;
    });

    return total;
  }

  getTotal() : number{
    var total = 0;

    this.movimientos.forEach(element => {
      total += element.monto;
    });

    return total;
  }

  

}
