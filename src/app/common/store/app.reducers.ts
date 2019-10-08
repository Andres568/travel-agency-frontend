import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState, initialState} from './app.state';
import { reservationReducer } from './reservations/reservations.reducers';

import { roomReducer } from './rooms/rooms.reducers';
import { travelerReducer } from './travelers/travelers.reducers';
import { hotelReducer } from './hotel/hotels.reducers';

const reducers: ActionReducerMap<AppState> ={
    reservations: reservationReducer,
    hotels: hotelReducer,
    rooms: roomReducer,
    travelers: travelerReducer
}

export const ReducersStoreModule = StoreModule.forRoot(reducers, {
    initialState
})



