
import {
  initialState as Reservation,
  State as ReservationState
} from './reservations/reservations.reducers';

export interface AppState {
  // users: UserState;
  reservations: ReservationState;
}

export const initialState: AppState = {
  // users: User,
  reservations: Reservation
}

