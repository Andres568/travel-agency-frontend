import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import * as roomActions from './rooms.actions';

import {Action, Store} from '@ngrx/store';
import {
    GetAllRoomsSuccess,GetAllRoomsError,
    GetRoom, GetRoomSuccess, GetRoomError,
    AddRoom, AddRoomSuccess, AddRoomError,
    UpdateRoom, UpdateRoomSuccess, UpdateRoomError,
    RemoveRoom, RemoveRoomSuccess, RemoveRoomError
} from './rooms.actions';

import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';

import { Room} from '../../models/room';
import { Observable } from 'rxjs/internal/Observable';
import { RoomsService } from 'src/app/_services/rooms.service';
import { AppState } from '../app.state';


@Injectable()
export class RoomEffects {
  constructor(private actions$: Actions,
              private svc: RoomsService,
              private store: Store<AppState>) {
  }

    @Effect()
    getAllRooms$: Observable<Action> = this.actions$
    .pipe(   
        ofType(roomActions.GET_ROOMS),  
        switchMap(() => this.svc.findAll()),
        map(rooms => new GetAllRoomsSuccess(rooms)),
        catchError((err) => [new GetAllRoomsError(err)])
    );

    @Effect()
    createRoom$ = this.actions$
    .pipe(
        ofType(roomActions.CREATE_ROOM),
        map((action: AddRoom) => action.payload),
        concatMap(newRoom => this.svc.insert(newRoom)),
        map((newRoom: Room) => new AddRoomSuccess(newRoom)),
        catchError((err) => [new AddRoomError(err)])
    );

    @Effect()
    updateRoom$ = this.actions$
    .pipe(
        ofType(roomActions.UPDATE_ROOM),
        map((action: UpdateRoom) => action.payload),
        switchMap(room => this.svc.update(room)),
        map((room: Room) => new UpdateRoomSuccess(room)),
        catchError((err) => [new UpdateRoomError(err)])
    );

    @Effect()
    getRoom$ = this.actions$
    .pipe(
        ofType(roomActions.GET_ROOM),
        map((action: GetRoom) => action.payload),
        switchMap(id => this.svc.findById(id)),
        map(room => new GetRoomSuccess(room)),
        catchError((err) => [new GetRoomError(err)]),       
    );
      
    @Effect()
    removeRoom$ = this.actions$
    .pipe(
        ofType(roomActions.DELETE_ROOM),
        map((action: RemoveRoom) => action.payload),
        switchMap(id => this.svc.delete(id)),
        map((room: Room) => new RemoveRoomSuccess(room)),
        catchError((err) => [new RemoveRoomError(err)])
    );
    

}