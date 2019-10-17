import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../common/material.module';
// import { ReducersStoreModule } from '../common/store/app.reducers';
// import { EffectsStoreModule } from '../common/store/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { HeaderComponent } from '../common/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../common/shared.module';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { HotelsComponent } from './hotels/hotels/hotels.component';
import { CreateHotelComponent } from './hotels/create-hotel/create-hotel.component';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';
import { RoomsComponent } from './rooms/rooms/rooms.component';
import { CreateRoomComponent } from './rooms/create-room/create-room.component';
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { ReservationsComponent } from './reservations/reservations/reservations.component';
import { CreateReservationComponent } from './reservations/create-reservation/create-reservation.component';
import { EditReservationComponent } from './reservations/edit-reservation/edit-reservation.component';
import { HotelManagerComponent } from './hotels/hotel-manager/hotel-manager.component';
import { ReservationManagerComponent } from './reservations/reservation-manager/reservation-manager.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { UserManagerComponent } from './users/user-manager/user-manager.component';
import { HotelComponent } from './hotels/hotel/hotel.component';
import { CreateGuestComponent } from './guests/create-guest/create-guest.component';
import { EditGuestComponent } from './guests/edit-guest/edit-guest.component';


@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        // ReducersStoreModule,
        // EffectsStoreModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })    ],
    declarations:[
        HomeComponent,
        CreateUserComponent,
        EditUserComponent,
        UserManagerComponent,
        HotelsComponent,
        CreateHotelComponent,
        EditHotelComponent,
        RoomsComponent,
        CreateRoomComponent,
        EditRoomComponent,
        ReservationsComponent,
        CreateReservationComponent,
        EditReservationComponent,
        HotelManagerComponent,
        ReservationManagerComponent,
        SignInComponent,
        SignUpComponent,
        HotelComponent,
        CreateGuestComponent,
        EditGuestComponent
    ],
    entryComponents: [  
        CreateHotelComponent, 
        CreateRoomComponent,
        EditHotelComponent,
        EditRoomComponent,
        CreateReservationComponent, 
        CreateGuestComponent,
        EditReservationComponent,
        EditGuestComponent,
        
    ],
    exports:[
       
    ]

})
export class PagesModule{}