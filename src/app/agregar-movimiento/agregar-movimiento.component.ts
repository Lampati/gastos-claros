import { Component, OnInit, Input } from '@angular/core';
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
  submitted = false;

  user: User;

  tipos: Tipo[] = []

  @Input('tipos')
  set actualizarTipos(value: Tipo[]) {
    this.tipos = value;
    if (this.tipos.length > 0){
      this.f['tipo'].setValue(this.tipos[3].nombre);
    }      
  }

  // convenience getter for easy access to form fields
  get f() { return this.movimientoForm.controls; }


  constructor( private formBuilder: FormBuilder,
    private fireStoreService: FirestoreService
    ) { }

  ngOnInit() {
    this.movimientoForm = this.formBuilder.group({
      fecha: [this.getFechaActualDatepicker(), Validators.required],
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['']
    });

    

    this.user = new User(JSON.parse(localStorage.getItem('currentUser')));
    
    this.f['usuario'].setValue(this.user.nombreCorto);
  }

  getFechaActualDatepicker(): string {
    return new Date().getFullYear() 
        + '-'
        + (new Date().getMonth() + 1 ).toString().padStart(2,'0')
        + '-'
        + new Date().getDate().toString().padStart(2,'0')          
  }

  onSubmit() {
    // stop here if form is invalid
    this.submitted = true;

    if (this.movimientoForm.invalid) {
        return;
    }

    this.loading = true;
    var fechaMov = new Date(this.f.fecha.value + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':00-0300');

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
        .then(() => {
          this.loading = false 
          this.f['monto'].setValue('');
          this.submitted = false;
        })
        .catch( () => this.loading = false)
  }
  
}
