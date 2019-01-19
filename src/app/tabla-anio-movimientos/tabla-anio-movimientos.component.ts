import { Component, OnInit, Input } from '@angular/core';
import { Tipo } from '../_models/tipo';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-tabla-anio-movimientos',
  templateUrl: './tabla-anio-movimientos.component.html',
  styleUrls: ['./tabla-anio-movimientos.component.scss']
})
export class TablaAnioMovimientosComponent implements OnInit {
  
  @Input()
  tipos: Tipo[] = [];

  @Input()
  movimientos: Movimiento[] = [];

  constructor() { }

  ngOnInit() {
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
