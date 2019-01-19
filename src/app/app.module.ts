import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { HomeComponent } from './home/home.component';
import { UltimosMovimientosComponent } from './ultimos-movimientos/ultimos-movimientos.component';
import { AgregarMovimientoComponent } from './agregar-movimiento/agregar-movimiento.component';
import { ResumenMovimientosComponent } from './resumen-movimientos/resumen-movimientos.component';
import { FiltroMovimientosComponent } from './filtro-movimientos/filtro-movimientos.component';
import { TablaAnioMovimientosComponent } from './tabla-anio-movimientos/tabla-anio-movimientos.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MovimientosComponent,
    HomeComponent,
    UltimosMovimientosComponent,
    AgregarMovimientoComponent,
    ResumenMovimientosComponent,
    FiltroMovimientosComponent,
    TablaAnioMovimientosComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)   ,
    AngularFirestoreModule ,
    AngularFireAuthModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
