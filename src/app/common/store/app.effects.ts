import {EffectsModule} from '@ngrx/effects';
import { ReservationEffects } from './reservations/reservations.effects';
import { HotelEffects } from './hotel/hotels.effects';
import { RoomEffects } from './rooms/rooms.effects';
import { TravelerEffects } from './travelers/travelers.effects';


export const EffectsStoreModule =
    EffectsModule.forRoot([
        ReservationEffects,
        HotelEffects,
        RoomEffects,
        TravelerEffects
    ]);