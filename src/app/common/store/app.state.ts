
import {
  initialState as Reservation,
  State as ReservationState
} from './reservations/reservations.reducers';
import {
  initialState as Hotel,
  State as HotelState
} from './hotel/hotels.reducers';
import {
  initialState as Room,
  State as RoomState
} from './rooms/rooms.reducers';
import {
  initialState as Traveler,
  State as TravelerState
} from './travelers/travelers.reducers';

export interface AppState {
  reservations: ReservationState;
  hotels: HotelState;
  rooms: RoomState;
  travelers: TravelerState;
}

export const initialState: AppState = {
  reservations: Reservation,
  hotels: Hotel,
  rooms: Room,
  travelers: Traveler
}

