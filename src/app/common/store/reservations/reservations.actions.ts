import { Action } from '@ngrx/store';
import { Reservation} from '../../models/reservation';


export const GET_RESERVATIONS = '[ALL] Reservations';
export const GET_RESERVATIONS_SUCCESS = '[ALL] Reservations Success';
export const GET_RESERVATIONS_ERROR = '[ALL] Reservations Error';

export const GET_RESERVATION = '[GET] RESERVATION';
export const GET_RESERVATION_SUCCESS = '[GET] Reservations Success';
export const GET_RESERVATION_ERROR = '[GET] Reservations Error';

export const CREATE_RESERVATION = '[CREATE] RESERVATION';
export const CREATE_RESERVATION_SUCCESS = '[CREATE] RESERVATION Success';
export const CREATE_RESERVATION_ERROR = '[CREATE] RESERVATION Error';

export const DELETE_RESERVATION = '[DELETE] RESERVATION';
export const DELETE_RESERVATION_SUCCESS = '[DELETE] RESERVATION Success';
export const DELETE_RESERVATION_ERROR = '[DELETE] RESERVATION Error';

export const UPDATE_RESERVATION = '[UPDATE] RESERVATION';
export const UPDATE_RESERVATION_SUCCESS = '[UPDATE] RESERVATION Success';
export const UPDATE_RESERVATION_ERROR = '[UPDATE] RESERVATION Error';


/****************************************
 * GET all the Reservations
 ****************************************/
export class GetAllReservations implements Action {
    readonly type = GET_RESERVATIONS;
    constructor(){}
}

export class GetAllReservationsSuccess implements Action {
  readonly type = GET_RESERVATIONS_SUCCESS;

  constructor(public payload: Reservation[]) {
  }
}

export class GetAllReservationsError implements Action {
  readonly type = GET_RESERVATIONS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Reservation by id
 ****************************************/
export class GetReservation implements Action {
  readonly type =GET_RESERVATION;

  constructor(public payload: number) {
  }
}

export class GetReservationSuccess implements Action {
  readonly type =GET_RESERVATION_SUCCESS;

  constructor(public payload: Reservation) {
  }
}

export class GetReservationError implements Action {
  readonly type =GET_RESERVATION_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Reservation
 ****************************************/
export class AddReservation implements Action {
  readonly type = CREATE_RESERVATION;

  constructor(public payload: Reservation) { }
}

export class AddReservationSuccess implements Action {
  readonly type = CREATE_RESERVATION_SUCCESS;

  constructor(public payload?: number) { }
}

export class AddReservationError implements Action {
  readonly type = CREATE_RESERVATION_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Reservation by id
 ****************************************/
export class UpdateReservation implements Action {
  readonly type = UPDATE_RESERVATION;

  constructor(public payload: Reservation) {
  }
}

export class UpdateReservationSuccess implements Action {
  readonly type = UPDATE_RESERVATION_SUCCESS;
}

export class UpdateReservationError implements Action {
  readonly type = UPDATE_RESERVATION_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Reservation by id
 ****************************************/
export class RemoveReservation implements Action {
  readonly type = DELETE_RESERVATION;

  constructor(public payload: number) {
  }
}

export class RemoveReservationSuccess implements Action {
  readonly type = DELETE_RESERVATION_SUCCESS;

  constructor(public payload: Reservation) {
  }
}

export class RemoveReservationError implements Action {
  readonly type = DELETE_RESERVATION_ERROR;

  constructor(public payload: Error) {
  }
}
