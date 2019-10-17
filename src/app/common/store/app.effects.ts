import {EffectsModule} from '@ngrx/effects';
import { ReservationEffects } from './reservations/reservations.effects';
import { HotelEffects } from './hotel/hotels.effects';
import { RoomEffects } from './rooms/rooms.effects';
import { GuestEffects } from './guests/guests.effects';
import { EmergencyContactEffects } from './emergencyContacts/emergencyContacts.effects';


export const EffectsStoreModule =
    EffectsModule.forRoot([
        ReservationEffects,
        HotelEffects,
        RoomEffects,
        GuestEffects,
        EmergencyContactEffects
    ]);