import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tipo } from '../_models/tipo';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';
import { User } from '../_models/user';

@Component({
  selector: 'app-agregar-movimiento',
  templateUrl: './agregar-movimiento.component.html',
  styleUrls: ['./agregar-movimiento.component.scss']
})
export class AgregarMovimientoComponent implements OnInit {

  movimientoForm: FormGroup;
  loading = false;

  user: User;

  tipos: Tipo[] = [];

  // convenience getter for easy access to form fields
  get f() { return this.movimientoForm.controls; }


  constructor( private formBuilder: FormBuilder,
    private fireStoreService: FirestoreService
    ) { }

  ngOnInit() {
    this.movimientoForm = this.formBuilder.group({
      fecha: [new Date().toISOString().substring(0,10), Validators.required],
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['']
    });

    this.fireStoreService.getTipos().subscribe((movimientosSnap) => {
      this.tipos = [];
      movimientosSnap.forEach((data: any) => {
        const tipo = new Tipo()
        tipo.nombre = data.nombre;
        tipo.resta = data.resta;
        tipo.orden = data.orden;
        this.tipos.push(tipo);
      })
      if (this.tipos.length > 0){
        this.f['tipo'].setValue(this.tipos[0].nombre);
      }      
    });    

    this.user = new User(JSON.parse(localStorage.getItem('currentUser')));
    
    this.f['usuario'].setValue(this.user.nombreCorto);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.movimientoForm.invalid) {
        return;
    }

    this.loading = true;
    var fechaMov = new Date(this.f.fecha.value + ' ' + new Date().toTimeString());

    var mov = {
      anio: fechaMov.getFullYear(),
      mes: fechaMov.getMonth() + 1,
      monto: this.f.monto.value,
      nombre: this.f.nombre.value,
      tipo: this.f.tipo.value,
      usuario: this.f.usuario.value,
      fecha: fechaMov
    }

    const user = this.fireStoreService.crearMovimiento(mov)     
        .then(() => this.loading = false )
        .catch( () => this.loading = false)
  }
  
}
