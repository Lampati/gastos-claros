import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../_services/firestore.service';
import { Banco } from '../../_models/banco';

@Component({
  selector: 'app-resumen-bancos',
  templateUrl: './resumen-bancos.component.html',
  styleUrls: ['./resumen-bancos.component.scss']
})
export class ResumenBancosComponent implements OnInit {
  
  constructor(
    private fireStoreService: FirestoreService
  ) { }

  bancos: Banco[] = [];

  ngOnInit() {
    this.fireStoreService.getBancos().subscribe((bancoSnap) => {
      this.bancos = [];      
      
      bancoSnap.forEach((snap: any) => {
        const data = snap.payload.doc.data() ;

        const banco = new Banco()
        banco.anio = data.anio;
        banco.mes = data.mes;          
        banco.usuario = data.usuario;
        banco.nombre = data.nombre;
        banco.cajaAhorro = data.cajaAhorro;
        banco.cuentaCorriente = data.cuentaCorriente;
        banco.plazoFijo = data.plazoFijo;
        banco.bonos = data.bonos;
        banco.cajaAhorroDolares = data.cajaAhorroDolares;
        banco.plazoFijoDolares = data.plazoFijoDolares;
        banco.bonosDolares = data.bonosDolares;
        banco.documentId = snap.payload.doc.id;

        this.bancos.push(banco);
      })
    }); 
  }

  onEliminarClick(event, item){
    this.fireStoreService.deleteBanco(item.documentId).then(function() {
      }).catch(function(error) {
    });
  }
}
