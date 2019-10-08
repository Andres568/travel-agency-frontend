import { Injectable } from '@angular/core';
import { AddReservation, GetAllReservations, GetReservation, UpdateReservation, RemoveReservation } from '../common/store/reservations/reservations.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../common/store/app.state';
import { Reservation } from '../common/models/reservation';
import { Observable } from 'rxjs';
import { getAllReservations, getReservation } from '../common/store/reservations/reservations.reducers';
import { skipWhile } from 'rxjs/operators';
import { Traveler } from '../common/models/traveler';
import { GetAllTravelers, GetTraveler, AddTraveler, UpdateTraveler, RemoveTraveler } from '../common/store/travelers/travelers.actions';
import { getAllTravelers, getTraveler } from '../common/store/travelers/travelers.reducers';
import { Room } from '../common/models/room';
import { GetAllRooms, GetRoom, AddRoom, UpdateRoom, RemoveRoom } from '../common/store/rooms/rooms.actions';
import { getAllRooms, getRoom } from '../common/store/rooms/rooms.reducers';
import { GetAllHotels, GetHotel, AddHotel, UpdateHotel, RemoveHotel } from '../common/store/hotel/hotels.actions';
import { getAllHotels, getHotel } from '../common/store/hotel/hotels.reducers';
import { Hotel } from '../common/models/hotel';

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

  getAllTravelers(): Observable<Traveler[]> {
    this.store.dispatch(new GetAllTravelers());
    return this.store.select(getAllTravelers)
   .pipe(
     skipWhile(val => val == null)
   );
 }

 getTraveler(id: number): Observable<Traveler> {
   this.store.dispatch(new GetTraveler(id));
   return this.store.select(getTraveler)
   .pipe(
     skipWhile(val => val == null)
   );
 }

 addTraveler(traveler: Traveler){
   this.store.dispatch(new AddTraveler(traveler));
 }

 updateTraveler(traveler: Traveler) {
   this.store.dispatch(new UpdateTraveler(traveler));
 }

 removeTraveler(id: number) {
   this.store.dispatch(new RemoveTraveler(id));
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

}
