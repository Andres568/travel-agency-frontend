import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as hotelActions from './hotels.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllHotelsSuccess,GetAllHotelsError,
    GetHotel, GetHotelSuccess, GetHotelError,
    AddHotel, AddHotelSuccess, AddHotelError,
    UpdateHotel, UpdateHotelSuccess, UpdateHotelError,
    RemoveHotel, RemoveHotelSuccess, RemoveHotelError
} from './hotels.actions';

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { Hotel} from '../../models/hotel';
import { Observable } from 'rxjs/internal/Observable';
import { HotelsService } from 'src/app/_services/hotels.service';
import { AppState } from '../app.state';
import { Room } from '../../models/room';
import { AddRoom, RemoveRoom } from '../rooms/rooms.actions';
import { StoreService } from 'src/app/_services/store.service';


@Injectable()
export class HotelEffects {
  constructor(private actions$: Actions,
              private svc: HotelsService,
              private storeService: StoreService) {
  }

    @Effect()
    getAllHotels$: Observable<Action> = this.actions$
    .pipe(   
        ofType(hotelActions.GET_HOTELS),  
        switchMap(() => this.svc.findAll()),
        map(hotels => new GetAllHotelsSuccess(hotels)),
        catchError((err) => [new GetAllHotelsError(err)])
    );

    @Effect()
    createHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.CREATE_HOTEL),
        map((action: AddHotel) => action.payload),
        switchMap(newHotel => this.svc.insert(newHotel), 
                    (newHotel, insertedHotel) => [newHotel, insertedHotel]),
        concatMap(([newHotel, insertedHotel]: [Hotel, Hotel]) => {
            const newRooms: AddRoom[] = [];
            if (newHotel.rooms) {
                newHotel.rooms.forEach(room => {
                    room.hotelId = insertedHotel.id;
                    newRooms.push(new AddRoom(room));
                });
            }
            return [new AddHotelSuccess(insertedHotel), ...newRooms];
        }),
        catchError((err) => [new AddHotelError(err)])
    );

    @Effect()
    updateHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.UPDATE_HOTEL),
        map((action: UpdateHotel) => action.payload),
        map((hotel: Hotel) => {
            hotel.rooms = undefined;
            return hotel;
        }),
        switchMap(hotel => this.svc.update(hotel), (hotel) => hotel),
        map((hotel: Hotel) => new UpdateHotelSuccess(hotel)),
        catchError((err) => [new UpdateHotelError(err)])
    );

    @Effect()
    getHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.GET_HOTEL),
        map((action: GetHotel) => action.payload),
        switchMap(id => this.svc.findById(id)),
        switchMap(() => this.storeService.getAllRooms(),
        (hotel, rooms) => [hotel, rooms]),
        // map((hotel: Hotel) => new GetHotelSuccess(hotel)),
        map(([hotel, rooms]: [Hotel, Room[]])  => {
            let hotelRooms: Room[] = [];
            hotelRooms = rooms.filter(room => room.hotelId === hotel.id);
            hotel.rooms = hotelRooms;
            return new GetHotelSuccess(hotel);
        }),
        catchError((err) => [new GetHotelError(err)]),       
    );
      
    @Effect()
    removeHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.DELETE_HOTEL),
        map((action: RemoveHotel) => action.payload),
        switchMap(id => this.svc.delete(id)),
        switchMap(() => this.storeService.getAllRooms(),
        (hotel, rooms) => [hotel, rooms]),
        concatMap(([hotel, rooms]: [Hotel, Room[]])  => {
            let hotelRooms: Room[] = [];
            const deletedRooms: RemoveRoom[] = [];

            hotelRooms = rooms.filter(room => room.hotelId === hotel.id);

            if (hotelRooms) {
                hotelRooms.forEach(room => {
                    deletedRooms.push(new RemoveRoom(room.id));
                });
            }
            return [new RemoveHotelSuccess(hotel), ...deletedRooms];
        }),
        catchError((err) => [new RemoveHotelError(err)])
    );

}