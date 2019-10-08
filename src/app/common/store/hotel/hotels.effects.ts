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

import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { Hotel} from '../../models/hotel';
import { Observable } from 'rxjs/internal/Observable';
import { HotelsService } from 'src/app/_services/hotels.service';
import { AppState } from '../app.state';


@Injectable()
export class HotelEffects {
  constructor(private actions$: Actions,
              private svc: HotelsService,
              private store: Store<AppState>) {
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
        switchMap(newHotel => this.svc.insert(newHotel)),
        map((newHotel) => new AddHotelSuccess()),
        catchError((err) => [new AddHotelError(err)])
    );

    @Effect()
    updateHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.UPDATE_HOTEL),
        map((action: UpdateHotel) => action.payload),
        switchMap(hotel => this.svc.update(hotel)),
        map(() => new UpdateHotelSuccess()),
        catchError((err) => [new UpdateHotelError(err)])
    );

    @Effect()
    getHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.GET_HOTEL),
        map((action: GetHotel) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(hotel => new GetHotelSuccess(hotel)),
        catchError((err) => [new GetHotelError(err)]),       
    );
      
    @Effect()
    removeHotel$ = this.actions$
    .pipe(
        ofType(hotelActions.DELETE_HOTEL),
        map((action: RemoveHotel) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((hero: Hotel) => new RemoveHotelSuccess(hero)),
        catchError((err) => [new RemoveHotelError(err)])
    );
    

}