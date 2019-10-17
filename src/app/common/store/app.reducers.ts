import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState, initialState} from './app.state';
import { reservationReducer } from './reservations/reservations.reducers';

import { roomReducer } from './rooms/rooms.reducers';
import { guestReducer } from './guests/guests.reducers';
import { hotelReducer } from './hotel/hotels.reducers';
import { emergencyContactReducer } from './emergencyContacts/emergencyContacts.reducers';

const reducers: ActionReducerMap<AppState> ={
    reservations: reservationReducer,
    hotels: hotelReducer,
    rooms: roomReducer,
    guests: guestReducer,
    emergencyContacts: emergencyContactReducer,
}

export const ReducersStoreModule = StoreModule.forRoot(reducers, {
    initialState
})



