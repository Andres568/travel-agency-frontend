import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as guestActions from './guests.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllGuestsSuccess,GetAllGuestsError,
    GetGuest, GetGuestSuccess, GetGuestError,
    AddGuest, AddGuestSuccess, AddGuestError,
    UpdateGuest, UpdateGuestSuccess, UpdateGuestError,
    RemoveGuest, RemoveGuestSuccess, RemoveGuestError
} from './guests.actions';

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { Guest} from '../../models/guest';
import { Observable } from 'rxjs/internal/Observable';
import { GuestsService } from 'src/app/_services/guests.service';
import { AppState } from '../app.state';


@Injectable()
export class GuestEffects {
  constructor(private actions$: Actions,
              private svc: GuestsService,
              private store: Store<AppState>) {
  }

    @Effect()
    getAllGuests$: Observable<Action> = this.actions$
    .pipe(   
        ofType(guestActions.GET_GUESTS),  
        switchMap(() => this.svc.findAll()),
        map(guests => new GetAllGuestsSuccess(guests)),
        catchError((err) => [new GetAllGuestsError(err)])
    );

    @Effect()
    createGuest$ = this.actions$
    .pipe(
        ofType(guestActions.CREATE_GUEST),
        map((action: AddGuest) => action.payload),
        concatMap(newGuest => this.svc.insert(newGuest)),
        map((newGuest: Guest) => new AddGuestSuccess(newGuest)),
        catchError((err) => [new AddGuestError(err)])
    );

    @Effect()
    updateGuest$ = this.actions$
    .pipe(
        ofType(guestActions.UPDATE_GUEST),
        map((action: UpdateGuest) => action.payload),
        switchMap(guest => this.svc.update(guest)),
        map((guest: Guest) => new UpdateGuestSuccess(guest)),
        catchError((err) => [new UpdateGuestError(err)])
    );

    @Effect()
    getGuest$ = this.actions$
    .pipe(
        ofType(guestActions.GET_GUEST),
        map((action: GetGuest) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(guest => new GetGuestSuccess(guest)),
        catchError((err) => [new GetGuestError(err)]),       
    );
      
    @Effect()
    removeGuest$ = this.actions$
    .pipe(
        ofType(guestActions.DELETE_GUEST),
        map((action: RemoveGuest) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((guest: Guest) => new RemoveGuestSuccess(guest)),
        catchError((err) => [new RemoveGuestError(err)])
    );
    

}