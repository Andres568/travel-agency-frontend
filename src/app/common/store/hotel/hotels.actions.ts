import { Action } from '@ngrx/store';
import { Hotel} from '../../models/hotel';


export const GET_HOTELS = '[ALL] Hotels';
export const GET_HOTELS_SUCCESS = '[ALL] Hotels Success';
export const GET_HOTELS_ERROR = '[ALL] Hotels Error';

export const GET_HOTEL = '[GET] HOTEL';
export const GET_HOTEL_SUCCESS = '[GET] Hotels Success';
export const GET_HOTEL_ERROR = '[GET] Hotels Error';

export const CREATE_HOTEL = '[CREATE] HOTEL';
export const CREATE_HOTEL_SUCCESS = '[CREATE] HOTEL Success';
export const CREATE_HOTEL_ERROR = '[CREATE] HOTEL Error';

export const DELETE_HOTEL = '[DELETE] HOTEL';
export const DELETE_HOTEL_SUCCESS = '[DELETE] HOTEL Success';
export const DELETE_HOTEL_ERROR = '[DELETE] HOTEL Error';

export const UPDATE_HOTEL = '[UPDATE] HOTEL';
export const UPDATE_HOTEL_SUCCESS = '[UPDATE] HOTEL Success';
export const UPDATE_HOTEL_ERROR = '[UPDATE] HOTEL Error';


/****************************************
 * GET all the Hotels
 ****************************************/
export class GetAllHotels implements Action {
    readonly type = GET_HOTELS;
    constructor(){}
}

export class GetAllHotelsSuccess implements Action {
  readonly type = GET_HOTELS_SUCCESS;

  constructor(public payload: Hotel[]) {
  }
}

export class GetAllHotelsError implements Action {
  readonly type = GET_HOTELS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Hotel by id
 ****************************************/
export class GetHotel implements Action {
  readonly type =GET_HOTEL;

  constructor(public payload: number) {
  }
}

export class GetHotelSuccess implements Action {
  readonly type =GET_HOTEL_SUCCESS;

  constructor(public payload: Hotel) {
  }
}

export class GetHotelError implements Action {
  readonly type =GET_HOTEL_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Hotel
 ****************************************/
export class AddHotel implements Action {
  readonly type = CREATE_HOTEL;

  constructor(public payload: Hotel) { }
}

export class AddHotelSuccess implements Action {
  readonly type = CREATE_HOTEL_SUCCESS;

  constructor(public payload?: number) { }
}

export class AddHotelError implements Action {
  readonly type = CREATE_HOTEL_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Hotel by id
 ****************************************/
export class UpdateHotel implements Action {
  readonly type = UPDATE_HOTEL;

  constructor(public payload: Hotel) {
  }
}

export class UpdateHotelSuccess implements Action {
  readonly type = UPDATE_HOTEL_SUCCESS;
}

export class UpdateHotelError implements Action {
  readonly type = UPDATE_HOTEL_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Hotel by id
 ****************************************/
export class RemoveHotel implements Action {
  readonly type = DELETE_HOTEL;

  constructor(public payload: number) {
  }
}

export class RemoveHotelSuccess implements Action {
  readonly type = DELETE_HOTEL_SUCCESS;

  constructor(public payload: Hotel) {
  }
}

export class RemoveHotelError implements Action {
  readonly type = DELETE_HOTEL_ERROR;

  constructor(public payload: Error) {
  }
}
