import { Action } from '@ngrx/store';
import { Room} from '../../models/room';


export const GET_ROOMS = '[ALL] Rooms';
export const GET_ROOMS_SUCCESS = '[ALL] Rooms Success';
export const GET_ROOMS_ERROR = '[ALL] Rooms Error';

export const GET_ROOM = '[GET] ROOM';
export const GET_ROOM_SUCCESS = '[GET] Rooms Success';
export const GET_ROOM_ERROR = '[GET] Rooms Error';

export const CREATE_ROOM = '[CREATE] ROOM';
export const CREATE_ROOM_SUCCESS = '[CREATE] ROOM Success';
export const CREATE_ROOM_ERROR = '[CREATE] ROOM Error';

export const DELETE_ROOM = '[DELETE] ROOM';
export const DELETE_ROOM_SUCCESS = '[DELETE] ROOM Success';
export const DELETE_ROOM_ERROR = '[DELETE] ROOM Error';

export const UPDATE_ROOM = '[UPDATE] ROOM';
export const UPDATE_ROOM_SUCCESS = '[UPDATE] ROOM Success';
export const UPDATE_ROOM_ERROR = '[UPDATE] ROOM Error';


/****************************************
 * GET all the Rooms
 ****************************************/
export class GetAllRooms implements Action {
    readonly type = GET_ROOMS;
    constructor(){}
}

export class GetAllRoomsSuccess implements Action {
  readonly type = GET_ROOMS_SUCCESS;

  constructor(public payload: Room[]) {
  }
}

export class GetAllRoomsError implements Action {
  readonly type = GET_ROOMS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Room by id
 ****************************************/
export class GetRoom implements Action {
  readonly type =GET_ROOM;

  constructor(public payload: number) {
  }
}

export class GetRoomSuccess implements Action {
  readonly type =GET_ROOM_SUCCESS;

  constructor(public payload: Room) {
  }
}

export class GetRoomError implements Action {
  readonly type =GET_ROOM_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Room
 ****************************************/
export class AddRoom implements Action {
  readonly type = CREATE_ROOM;

  constructor(public payload: Room) { }
}

export class AddRoomSuccess implements Action {
  readonly type = CREATE_ROOM_SUCCESS;

  constructor(public payload?: number) { }
}

export class AddRoomError implements Action {
  readonly type = CREATE_ROOM_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Room by id
 ****************************************/
export class UpdateRoom implements Action {
  readonly type = UPDATE_ROOM;

  constructor(public payload: Room) {
  }
}

export class UpdateRoomSuccess implements Action {
  readonly type = UPDATE_ROOM_SUCCESS;
}

export class UpdateRoomError implements Action {
  readonly type = UPDATE_ROOM_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Room by id
 ****************************************/
export class RemoveRoom implements Action {
  readonly type = DELETE_ROOM;

  constructor(public payload: number) {
  }
}

export class RemoveRoomSuccess implements Action {
  readonly type = DELETE_ROOM_SUCCESS;

  constructor(public payload: Room) {
  }
}

export class RemoveRoomError implements Action {
  readonly type = DELETE_ROOM_ERROR;

  constructor(public payload: Error) {
  }
}
