import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tipo } from '../_models/tipo';
import { FirestoreService } from '../_services/firestore.service';
import { Movimiento } from '../_models/movimiento';

@Component({
  selector: 'app-agregar-movimiento',
  templateUrl: './agregar-movimiento.component.html',
  styleUrls: ['./agregar-movimiento.component.scss']
})
export class AgregarMovimientoComponent implements OnInit {

  movimientoForm: FormGroup;
  loading = false;

  tipos: Tipo[] = [];

  // convenience getter for easy access to form fields
  get f() { return this.movimientoForm.controls; }


  constructor( private formBuilder: FormBuilder,
    private fireStoreService: FirestoreService
    ) { }

  ngOnInit() {
    this.movimientoForm = this.formBuilder.group({
      fecha: [new Date().toLocaleDateString(), Validators.required],
      tipo: ['', Validators.required],
      monto: ['', Validators.required],
      nombre: ['']
    });

    this.fireStoreService.getTipos().subscribe((movimientosSnap) => {
      this.tipos = [];
      movimientosSnap.forEach((data: any) => {
        const tipo = new Tipo()
        tipo.nombre = data.nombre;
        this.tipos.push(tipo);
      })
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.movimientoForm.invalid) {
        return;
    }

    this.loading = true;

    var mov = {
      anio: 2019,
      monto: this.f.monto.value,
      nombre: this.f.nombre.value,
      tipo: this.f.tipo.value,
      usuario: "fed_lanza@hotmail.com",
      fecha: new Date (this.f.fecha.value)
    }

    const user = this.fireStoreService.crearMovimiento(mov)     
        .then(() => this.loading = false )
        .catch( () => this.loading = false)
  }
  
}
