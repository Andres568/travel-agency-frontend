import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState, initialState} from './app.state';

// import { userReducer } from './users/users.reducers';
import { reservationReducer } from './reservations/reservations.reducers';

const reducers: ActionReducerMap<AppState> ={
    // users: userReducer, 
    reservations: reservationReducer
}

export const ReducersStoreModule = StoreModule.forRoot(reducers, {
    initialState
})



