import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as emergencyContactActions from './emergencyContacts.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllEmergencyContactsSuccess,GetAllEmergencyContactsError,
    GetEmergencyContact, GetEmergencyContactSuccess, GetEmergencyContactError,
    AddEmergencyContact, AddEmergencyContactSuccess, AddEmergencyContactError,
    UpdateEmergencyContact, UpdateEmergencyContactSuccess, UpdateEmergencyContactError,
    RemoveEmergencyContact, RemoveEmergencyContactSuccess, RemoveEmergencyContactError
} from './emergencyContacts.actions';

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { EmergencyContact} from '../../models/emergencyContact';
import { Observable } from 'rxjs/internal/Observable';
import { EmergencyContactsService } from 'src/app/_services/emergencyContacts.service';
import { AppState } from '../app.state';


@Injectable()
export class EmergencyContactEffects {
  constructor(private actions$: Actions,
              private svc: EmergencyContactsService,
              private store: Store<AppState>) {
  }

    @Effect()
    getAllEmergencyContacts$: Observable<Action> = this.actions$
    .pipe(   
        ofType(emergencyContactActions.GET_EMERGENCYCONTACTS),  
        switchMap(() => this.svc.findAll()),
        map(emergencyContacts => new GetAllEmergencyContactsSuccess(emergencyContacts)),
        catchError((err) => [new GetAllEmergencyContactsError(err)])
    );

    @Effect()
    createEmergencyContact$ = this.actions$
    .pipe(
        ofType(emergencyContactActions.CREATE_EMERGENCYCONTACT),
        map((action: AddEmergencyContact) => action.payload),
        concatMap(newEmergencyContact => this.svc.insert(newEmergencyContact)),
        map((newEmergencyContact: EmergencyContact) => new AddEmergencyContactSuccess(newEmergencyContact)),
        catchError((err) => [new AddEmergencyContactError(err)])
    );

    @Effect()
    updateEmergencyContact$ = this.actions$
    .pipe(
        ofType(emergencyContactActions.UPDATE_EMERGENCYCONTACT),
        map((action: UpdateEmergencyContact) => action.payload),
        switchMap(emergencyContact => this.svc.update(emergencyContact)),
        map((emergencyContact: EmergencyContact) => new UpdateEmergencyContactSuccess(emergencyContact)),
        catchError((err) => [new UpdateEmergencyContactError(err)])
    );

    @Effect()
    getEmergencyContact$ = this.actions$
    .pipe(
        ofType(emergencyContactActions.GET_EMERGENCYCONTACT),
        map((action: GetEmergencyContact) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(emergencyContact => new GetEmergencyContactSuccess(emergencyContact)),
        catchError((err) => [new GetEmergencyContactError(err)]),       
    );
      
    @Effect()
    removeEmergencyContact$ = this.actions$
    .pipe(
        ofType(emergencyContactActions.DELETE_EMERGENCYCONTACT),
        map((action: RemoveEmergencyContact) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((emergencyContact: EmergencyContact) => new RemoveEmergencyContactSuccess(emergencyContact)),
        catchError((err) => [new RemoveEmergencyContactError(err)])
    );
    

}