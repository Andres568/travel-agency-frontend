import {EffectsModule} from '@ngrx/effects';
import { ReservationEffects } from './reservations/reservations.effects';
// import { UserEffects } from './users/users.effects';

export const EffectsStoreModule = EffectsModule.forRoot([ReservationEffects]);