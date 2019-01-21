import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { HomeComponent } from './home/home.component';
import { BancosComponent } from './bancos/bancos.component';



const routes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'movimientos', component: MovimientosComponent},      
      {path: 'bancos', component: BancosComponent}      
    ]  },
  { path: '', redirectTo: 'home',   pathMatch: 'full' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
