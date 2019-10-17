import { Action } from '@ngrx/store';
import { Guest} from '../../models/guest';


export const GET_GUESTS = '[ALL] Guests';
export const GET_GUESTS_SUCCESS = '[ALL] Guests Success';
export const GET_GUESTS_ERROR = '[ALL] Guests Error';

export const GET_GUEST = '[GET] GUEST';
export const GET_GUEST_SUCCESS = '[GET] Guests Success';
export const GET_GUEST_ERROR = '[GET] Guests Error';

export const CREATE_GUEST = '[CREATE] GUEST';
export const CREATE_GUEST_SUCCESS = '[CREATE] GUEST Success';
export const CREATE_GUEST_ERROR = '[CREATE] GUEST Error';

export const DELETE_GUEST = '[DELETE] GUEST';
export const DELETE_GUEST_SUCCESS = '[DELETE] GUEST Success';
export const DELETE_GUEST_ERROR = '[DELETE] GUEST Error';

export const UPDATE_GUEST = '[UPDATE] GUEST';
export const UPDATE_GUEST_SUCCESS = '[UPDATE] GUEST Success';
export const UPDATE_GUEST_ERROR = '[UPDATE] GUEST Error';


/****************************************
 * GET all the Guests
 ****************************************/
export class GetAllGuests implements Action {
    readonly type = GET_GUESTS;
    constructor(){}
}

export class GetAllGuestsSuccess implements Action {
  readonly type = GET_GUESTS_SUCCESS;

  constructor(public payload: Guest[]) {
  }
}

export class GetAllGuestsError implements Action {
  readonly type = GET_GUESTS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Guest by id
 ****************************************/
export class GetGuest implements Action {
  readonly type =GET_GUEST;

  constructor(public payload: number) {
  }
}

export class GetGuestSuccess implements Action {
  readonly type =GET_GUEST_SUCCESS;

  constructor(public payload: Guest) {
  }
}

export class GetGuestError implements Action {
  readonly type =GET_GUEST_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Guest
 ****************************************/
export class AddGuest implements Action {
  readonly type = CREATE_GUEST;

  constructor(public payload: Guest) { }
}

export class AddGuestSuccess implements Action {
  readonly type = CREATE_GUEST_SUCCESS;

  constructor(public payload: Guest) { }
}

export class AddGuestError implements Action {
  readonly type = CREATE_GUEST_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Guest by id
 ****************************************/
export class UpdateGuest implements Action {
  readonly type = UPDATE_GUEST;

  constructor(public payload: Guest) {
  }
}

export class UpdateGuestSuccess implements Action {
  readonly type = UPDATE_GUEST_SUCCESS;

  constructor(public payload: Guest) { }
}

export class UpdateGuestError implements Action {
  readonly type = UPDATE_GUEST_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Guest by id
 ****************************************/
export class RemoveGuest implements Action {
  readonly type = DELETE_GUEST;

  constructor(public payload: number) {
  }
}

export class RemoveGuestSuccess implements Action {
  readonly type = DELETE_GUEST_SUCCESS;

  constructor(public payload: Guest) {
  }
}

export class RemoveGuestError implements Action {
  readonly type = DELETE_GUEST_ERROR;

  constructor(public payload: Error) {
  }
}
