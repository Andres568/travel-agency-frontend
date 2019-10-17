
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
  initialState as Guest,
  State as GuestState
} from './guests/guests.reducers';
import {
  initialState as EmergencyContact,
  State as EmergencyContactState
} from './emergencyContacts/emergencyContacts.reducers';


export interface AppState {
  reservations: ReservationState;
  hotels: HotelState;
  rooms: RoomState;
  guests: GuestState;
  emergencyContacts: EmergencyContactState;
}

export const initialState: AppState = {
  reservations: Reservation,
  hotels: Hotel,
  rooms: Room,
  guests: Guest,
  emergencyContacts: EmergencyContact
}

