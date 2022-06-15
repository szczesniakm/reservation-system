import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';
import { LoginComponent } from './authentication/login/login.component';
import { ReservationsGridComponent } from './reservations/reservations-grid/reservations-grid.component';

const routes: Routes = [
  { path: '', component: ReservationsGridComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
