import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-filtro-movimientos',
  templateUrl: './filtro-movimientos.component.html',
  styleUrls: ['./filtro-movimientos.component.scss']
})
export class FiltroMovimientosComponent implements OnInit {

  @Output()
  movimientos =  new EventEmitter<Movimiento[]>();

  constructor( private fireStoreService: FirestoreService) { }

  anio: number = new Date().getFullYear();
  filtroUsuario: string = "Todos"


  ngOnInit() {
    this.actualizarMovimientos();   
  }

  actualizarMovimientos() {
    this.fireStoreService.getMovimientosDelAnio(this.anio).subscribe((elementos) => {
      this.filtrar(elementos);
    });
  }

  onChangeAnio(valor){
    this.anio = parseInt(valor);
    this.actualizarMovimientos();
  }

  onClickFiltro(valor){
    this.filtroUsuario = valor;
    this.actualizarMovimientos();
  }

  filtrar(elementos: Movimiento[]){
    this.movimientos.emit(elementos.filter (x => (x.usuario == this.filtroUsuario || this.filtroUsuario == 'Todos')));
  }
}
