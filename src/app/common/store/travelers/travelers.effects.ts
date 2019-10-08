import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as travelerActions from './travelers.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllTravelersSuccess,GetAllTravelersError,
    GetTraveler, GetTravelerSuccess, GetTravelerError,
    AddTraveler, AddTravelerSuccess, AddTravelerError,
    UpdateTraveler, UpdateTravelerSuccess, UpdateTravelerError,
    RemoveTraveler, RemoveTravelerSuccess, RemoveTravelerError
} from './travelers.actions';

import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { Traveler} from '../../models/traveler';
import { Observable } from 'rxjs/internal/Observable';
import { TravelersService } from 'src/app/_services/travelers.service';
import { AppState } from '../app.state';


@Injectable()
export class TravelerEffects {
  constructor(private actions$: Actions,
              private svc: TravelersService,
              private store: Store<AppState>) {
  }

    @Effect()
    getAllTravelers$: Observable<Action> = this.actions$
    .pipe(   
        ofType(travelerActions.GET_TRAVELERS),  
        switchMap(() => this.svc.findAll()),
        map(travelers => new GetAllTravelersSuccess(travelers)),
        catchError((err) => [new GetAllTravelersError(err)])
    );

    @Effect()
    createTraveler$ = this.actions$
    .pipe(
        ofType(travelerActions.CREATE_TRAVELER),
        map((action: AddTraveler) => action.payload),
        switchMap(newTraveler => this.svc.insert(newTraveler)),
        map((newTraveler) => new AddTravelerSuccess()),
        catchError((err) => [new AddTravelerError(err)])
    );

    @Effect()
    updateTraveler$ = this.actions$
    .pipe(
        ofType(travelerActions.UPDATE_TRAVELER),
        map((action: UpdateTraveler) => action.payload),
        switchMap(traveler => this.svc.update(traveler)),
        map(() => new UpdateTravelerSuccess()),
        catchError((err) => [new UpdateTravelerError(err)])
    );

    @Effect()
    getTraveler$ = this.actions$
    .pipe(
        ofType(travelerActions.GET_TRAVELER),
        map((action: GetTraveler) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(traveler => new GetTravelerSuccess(traveler)),
        catchError((err) => [new GetTravelerError(err)]),       
    );
      
    @Effect()
    removeTraveler$ = this.actions$
    .pipe(
        ofType(travelerActions.DELETE_TRAVELER),
        map((action: RemoveTraveler) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((hero: Traveler) => new RemoveTravelerSuccess(hero)),
        catchError((err) => [new RemoveTravelerError(err)])
    );
    

}