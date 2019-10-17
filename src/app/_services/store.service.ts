import { Injectable } from '@angular/core';
import { AddReservation, GetAllReservations, GetReservation, UpdateReservation, RemoveReservation } from '../common/store/reservations/reservations.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../common/store/app.state';
import { Reservation } from '../common/models/reservation';
import { Observable } from 'rxjs';
import { getAllReservations, getReservation } from '../common/store/reservations/reservations.reducers';
import { skipWhile } from 'rxjs/operators';
import { Guest } from '../common/models/guest';
import { GetAllGuests, GetGuest, AddGuest, UpdateGuest, RemoveGuest } from '../common/store/guests/guests.actions';
import { getAllGuests, getGuest } from '../common/store/guests/guests.reducers';
import { Room } from '../common/models/room';
import { GetAllRooms, GetRoom, AddRoom, UpdateRoom, RemoveRoom } from '../common/store/rooms/rooms.actions';
import { getAllRooms, getRoom } from '../common/store/rooms/rooms.reducers';
import { GetAllHotels, GetHotel, AddHotel, UpdateHotel, RemoveHotel } from '../common/store/hotel/hotels.actions';
import { getAllHotels, getHotel } from '../common/store/hotel/hotels.reducers';
import { Hotel } from '../common/models/hotel';
import { EmergencyContact } from '../common/models/emergencyContact';
import { GetAllEmergencyContacts, GetEmergencyContact, AddEmergencyContact, UpdateEmergencyContact, RemoveEmergencyContact } from '../common/store/emergencyContacts/emergencyContacts.actions';
import { getAllEmergencyContacts, getEmergencyContact } from '../common/store/emergencyContacts/emergencyContacts.reducers';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<AppState>) { }

  getAllReservations(): Observable<Reservation[]> {
     this.store.dispatch(new GetAllReservations());
     return this.store.select(getAllReservations)
    .pipe(
      skipWhile(val => val == null)
    );
  }

  getReservation(id: number): Observable<Reservation> {
    this.store.dispatch(new GetReservation(id));
    return this.store.select(getReservation)
    .pipe(
      skipWhile(val => val == null)
    );
  }

  addReservation(reservation: Reservation){
    this.store.dispatch(new AddReservation(reservation));
  }

  updateReservation(reservation: Reservation) {
    this.store.dispatch(new UpdateReservation(reservation));
  }

  removeReservation(id: number) {
    this.store.dispatch(new RemoveReservation(id));
  }

  getAllGuests(): Observable<Guest[]> {
    this.store.dispatch(new GetAllGuests());
    return this.store.select(getAllGuests)
   .pipe(
     skipWhile(val => val == null)
   );
 }

 getGuest(id: number): Observable<Guest> {
   this.store.dispatch(new GetGuest(id));
   return this.store.select(getGuest)
   .pipe(
     skipWhile(val => val == null)
   );
 }

 addGuest(guest: Guest){
   this.store.dispatch(new AddGuest(guest));
 }

 updateGuest(guest: Guest) {
   this.store.dispatch(new UpdateGuest(guest));
 }

 removeGuest(id: number) {
   this.store.dispatch(new RemoveGuest(id));
 }

 getAllRooms(): Observable<Room[]> {
  this.store.dispatch(new GetAllRooms());
  return this.store.select(getAllRooms)
 .pipe(
   skipWhile(val => val == null)
 );
}

  getRoom(id: number): Observable<Room> {
  this.store.dispatch(new GetRoom(id));
  return this.store.select(getRoom)
  .pipe(
    skipWhile(val => val == null)
  );
  }

  addRoom(room: Room){
  this.store.dispatch(new AddRoom(room));
  }

  updateRoom(room: Room) {
  this.store.dispatch(new UpdateRoom(room));
  }

  removeRoom(id: number) {
  this.store.dispatch(new RemoveRoom(id));
  }

  getAllHotels(): Observable<Hotel[]> {
    this.store.dispatch(new GetAllHotels());
    return this.store.select(getAllHotels)
  .pipe(
    skipWhile(val => val == null)
  );
  }

  getHotel(id: number): Observable<Hotel> {
  this.store.dispatch(new GetHotel(id));
  return this.store.select(getHotel)
  .pipe(
    skipWhile(val => val == null)
  );
  }

  addHotel(hotel: Hotel){
  this.store.dispatch(new AddHotel(hotel));
  }

  updateHotel(hotel: Hotel) {
  this.store.dispatch(new UpdateHotel(hotel));
  }

  removeHotel(id: number) {
  this.store.dispatch(new RemoveHotel(id));
  }

  getAllEmergencyContacts(): Observable<EmergencyContact[]> {
    this.store.dispatch(new GetAllEmergencyContacts());
    return this.store.select(getAllEmergencyContacts)
  .pipe(
    skipWhile(val => val == null)
  );
  }

  getEmergencyContact(id: number): Observable<EmergencyContact> {
  this.store.dispatch(new GetEmergencyContact(id));
  return this.store.select(getEmergencyContact)
  .pipe(
    skipWhile(val => val == null)
  );
  }

  addEmergencyContact(emergencyContact: EmergencyContact){
  this.store.dispatch(new AddEmergencyContact(emergencyContact));
  }

  updateEmergencyContact(emergencyContact: EmergencyContact) {
  this.store.dispatch(new UpdateEmergencyContact(emergencyContact));
  }

  removeEmergencyContact(id: number) {
  this.store.dispatch(new RemoveEmergencyContact(id));
  }
}
