import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../_services/firestore.service';
import { Tipo } from '../_models/tipo';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-balance-movimientos',
  templateUrl: './balance-movimientos.component.html',
  styleUrls: ['./balance-movimientos.component.scss']
})
export class BalanceMovimientosComponent implements OnInit {

  constructor( private fireStoreService: FirestoreService) { }

  @Input()
  tipos: Tipo[] = [];

  movimientos: Movimiento[] = [];

  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;


  ngOnInit() {
    this.fireStoreService.getMovimientosDelMesAnio(this.anio, this.mes).subscribe((elementos) => {
      this.movimientos = elementos;
      this.calcularBalanceMesActual();
    
    });
  }
  
  calcularBalanceMesActual(): number {
    var total = 0;
    
    this.movimientos.forEach(element => {
      if (this.tipos.find(x => x.nombre == element.tipo).resta){
        total -= element.monto;
      }else{
        total += element.monto;
      }
    });

    return total;
  }
}
