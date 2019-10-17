import { NgModule, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { SignInComponent } from '../pages/login/sign-in/sign-in.component';
import { SignUpComponent } from '../pages/login/sign-up/sign-up.component';
import { HotelsComponent } from '../pages/hotels/hotels/hotels.component';
import { HotelManagerComponent } from '../pages/hotels/hotel-manager/hotel-manager.component';
import { ReservationsComponent } from '../pages/reservations/reservations/reservations.component';
import { ReservationManagerComponent } from '../pages/reservations/reservation-manager/reservation-manager.component';
import { UserManagerComponent } from '../pages/users/user-manager/user-manager.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { HotelComponent } from '../pages/hotels/hotel/hotel.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { HotelsService } from '../_services/hotels.service';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'hotels', component: HotelsComponent},
  {path: 'hotel/:id', component: HotelComponent},
  {path: 'hotel-manager', component: HotelManagerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['TravelAgent'] }},
  {path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['TravelAgent', 'Traveler'] }},
  {path: 'reservation-manager', component: ReservationManagerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['TravelAgent'] }},
  {path: 'user-manager', component: UserManagerComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['TravelAgent'] }},
  {path: '', component: HomeComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    HotelsService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
