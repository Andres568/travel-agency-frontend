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

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { Reservation} from '../../models/reservation';
import { Observable } from 'rxjs/internal/Observable';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { AppState } from '../app.state';
import { Guest } from '../../models/guest';
import { AddGuest, RemoveGuest } from '../guests/guests.actions';
import { StoreService } from 'src/app/_services/store.service';


@Injectable()
export class ReservationEffects {
  constructor(private actions$: Actions,
              private svc: ReservationsService,
              private storeService: StoreService) {
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
        switchMap(newReservation => this.svc.insert(newReservation), 
                    (newReservation, insertedReservation) => [newReservation, insertedReservation]),
        concatMap(([newReservation, insertedReservation]: [Reservation, Reservation]) => {
            const newGuests: AddGuest[] = [];
            if (newReservation.guests) {
                newReservation.guests.forEach(guest => {
                    guest.reservationId = insertedReservation.id;
                    newGuests.push(new AddGuest(guest));
                });
            }
            return [new AddReservationSuccess(insertedReservation), ...newGuests];
        }),
        catchError((err) => [new AddReservationError(err)])
    );

    @Effect()
    updateReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.UPDATE_RESERVATION),
        map((action: UpdateReservation) => action.payload),
        map((reservation: Reservation) => {
            reservation.guests = undefined;
            return reservation;
        }),
        switchMap(reservation => this.svc.update(reservation), (reservation) => reservation),
        map((reservation: Reservation) => new UpdateReservationSuccess(reservation)),
        catchError((err) => [new UpdateReservationError(err)])
    );

    @Effect()
    getReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.GET_RESERVATION),
        map((action: GetReservation) => action.payload),
        switchMap(id => this.svc.findById(id)),
        switchMap(() => this.storeService.getAllGuests(),
        (reservation, guests) => [reservation, guests]),
        map(([reservation, guests]: [Reservation, Guest[]])  => {
            let reservationGuests: Guest[] = [];
            reservationGuests = guests.filter(guest => guest.reservationId === reservation.id);
            reservation.guests = reservationGuests;
            return new GetReservationSuccess(reservation);
        }),
        catchError((err) => [new GetReservationError(err)]),       
    );
      
    @Effect()
    removeReservation$ = this.actions$
    .pipe(
        ofType(reservationActions.DELETE_RESERVATION),
        map((action: RemoveReservation) => action.payload),
        switchMap(id => this.svc.delete(id)),
        switchMap(() => this.storeService.getAllGuests(),
        (reservation, guests) => [reservation, guests]),
        concatMap(([reservation, guests]: [Reservation, Guest[]])  => {
            let reservationGuests: Guest[] = [];
            const deletedGuests: RemoveGuest[] = [];

            reservationGuests = guests.filter(guest => guest.reservationId === reservation.id);

            if (reservationGuests) {
                reservationGuests.forEach(guest => {
                    deletedGuests.push(new RemoveGuest(guest.id));
                });
            }
            return [new RemoveReservationSuccess(reservation), ...deletedGuests];
        }),
        catchError((err) => [new RemoveReservationError(err)])
    );

}