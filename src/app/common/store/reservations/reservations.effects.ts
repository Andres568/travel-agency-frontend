import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as reservationActions from './reservations.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllReservationsSuccess,GetAllReservationsError,
    GetReservation, GetReservationSuccess, GetReservationError,
    AddReservation, AddReservationSuccess, AddReservationError,
    UpdateReservation, UpdateReservationSuccess, UpdateReservationError,
    RemoveReservation, RemoveReservationSuccess, RemoveReservationError
} from './reservations.actions';

import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { Reservation} from '../../models/reservation';
import { Observable } from 'rxjs/internal/Observable';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { AppState } from '../app.state';


@Injectable()
export class ReservationEffects {
  constructor(private actions$: Actions,
              private svc: ReservationsService,
              private store: Store<AppState>) {
  }

    @Effect()
    getAllReservations$: Observable<Action> = this.actions$
    .pipe(   
        ofType(reservationActions.GET_RESERVATIONS),  
        switchMap(() => this.svc.findAll()),
        map(reservations => new GetAllReservationsSuccess(reservations)),
        catchError((err) => [new GetAllReservationsError(err)])
    );

    @Effect()
    createReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.CREATE_RESERVATION),
        map((action: AddReservation) => action.payload),
        switchMap(newReservation => this.svc.insert(newReservation)),
        map((newReservation) => new AddReservationSuccess()),
        catchError((err) => [new AddReservationError(err)])
    );

    @Effect()
    updateReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.UPDATE_RESERVATION),
        map((action: UpdateReservation) => action.payload),
        switchMap(reservation => this.svc.update(reservation)),
        map(() => new UpdateReservationSuccess()),
        catchError((err) => [new UpdateReservationError(err)])
    );

    @Effect()
    getReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.GET_RESERVATION),
        map((action: GetReservation) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(reservation => new GetReservationSuccess(reservation)),
        catchError((err) => [new GetReservationError(err)]),       
    );
      
    @Effect()
    removeReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.DELETE_RESERVATION),
        map((action: RemoveReservation) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((hero: Reservation) => new RemoveReservationSuccess(hero)),
        catchError((err) => [new RemoveReservationError(err)])
    );
    

}