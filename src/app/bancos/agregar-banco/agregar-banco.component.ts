import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../_services/firestore.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-agregar-banco',
  templateUrl: './agregar-banco.component.html',
  styleUrls: ['./agregar-banco.component.scss']
})
export class AgregarBancoComponent implements OnInit {

  bancoForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;


   // convenience getter for easy access to form fields
   get f() { return this.bancoForm.controls; }
  
  constructor( private formBuilder: FormBuilder,
    private fireStoreService: FirestoreService
    ) { }

  ngOnInit() {
    this.bancoForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      anio: [new Date().getFullYear(), Validators.required],
      mes: [new Date().getMonth() + 1, Validators.required],
      nombre: ['Banco Frances', Validators.required],
      cajaAhorro: ['', Validators],
      cuentaCorriente: ['', Validators],
      plazoFijo: ['', Validators],
      bonos: ['', Validators],
      cajaAhorroDolares: ['', Validators],
      plazoFijoDolares: ['', Validators],
      bonosDolares: ['', Validators] 
    });

    this.user = new User(JSON.parse(localStorage.getItem('currentUser')));    
    this.f['usuario'].setValue(this.user.nombreCorto);

  }

  onSubmit() {
    // stop here if form is invalid
    this.submitted = true;

    if (this.bancoForm.invalid) {
        return;
    }

    this.loading = true;

    var banco = {
      anio: this.f.anio.value,
      mes: this.f.mes.value,
      usuario: this.f.usuario.value,
      nombre: this.f.nombre.value,
      cajaAhorro: this.f.cajaAhorro.value,
      cuentaCorriente: this.f.cuentaCorriente.value,
      plazoFijo: this.f.plazoFijo.value,
      bonos: this.f.bonos.value,
      cajaAhorroDolares: this.f.cajaAhorroDolares.value,
      plazoFijoDolares: this.f.plazoFijoDolares.value,
      bonosDolares: this.f.bonosDolares.value
    }

    const user = this.fireStoreService.crearBanco(banco)     
        .then(() => {
          this.loading = false 
          this.submitted = false;
        })
        .catch( () => this.loading = false)
  }

}
