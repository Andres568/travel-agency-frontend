import { Action } from '@ngrx/store';
import { Traveler} from '../../models/traveler';


export const GET_TRAVELERS = '[ALL] Travelers';
export const GET_TRAVELERS_SUCCESS = '[ALL] Travelers Success';
export const GET_TRAVELERS_ERROR = '[ALL] Travelers Error';

export const GET_TRAVELER = '[GET] TRAVELER';
export const GET_TRAVELER_SUCCESS = '[GET] Travelers Success';
export const GET_TRAVELER_ERROR = '[GET] Travelers Error';

export const CREATE_TRAVELER = '[CREATE] TRAVELER';
export const CREATE_TRAVELER_SUCCESS = '[CREATE] TRAVELER Success';
export const CREATE_TRAVELER_ERROR = '[CREATE] TRAVELER Error';

export const DELETE_TRAVELER = '[DELETE] TRAVELER';
export const DELETE_TRAVELER_SUCCESS = '[DELETE] TRAVELER Success';
export const DELETE_TRAVELER_ERROR = '[DELETE] TRAVELER Error';

export const UPDATE_TRAVELER = '[UPDATE] TRAVELER';
export const UPDATE_TRAVELER_SUCCESS = '[UPDATE] TRAVELER Success';
export const UPDATE_TRAVELER_ERROR = '[UPDATE] TRAVELER Error';


/****************************************
 * GET all the Travelers
 ****************************************/
export class GetAllTravelers implements Action {
    readonly type = GET_TRAVELERS;
    constructor(){}
}

export class GetAllTravelersSuccess implements Action {
  readonly type = GET_TRAVELERS_SUCCESS;

  constructor(public payload: Traveler[]) {
  }
}

export class GetAllTravelersError implements Action {
  readonly type = GET_TRAVELERS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET Traveler by id
 ****************************************/
export class GetTraveler implements Action {
  readonly type =GET_TRAVELER;

  constructor(public payload: number) {
  }
}

export class GetTravelerSuccess implements Action {
  readonly type =GET_TRAVELER_SUCCESS;

  constructor(public payload: Traveler) {
  }
}

export class GetTravelerError implements Action {
  readonly type =GET_TRAVELER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new Traveler
 ****************************************/
export class AddTraveler implements Action {
  readonly type = CREATE_TRAVELER;

  constructor(public payload: Traveler) { }
}

export class AddTravelerSuccess implements Action {
  readonly type = CREATE_TRAVELER_SUCCESS;

  constructor(public payload?: number) { }
}

export class AddTravelerError implements Action {
  readonly type = CREATE_TRAVELER_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE Traveler by id
 ****************************************/
export class UpdateTraveler implements Action {
  readonly type = UPDATE_TRAVELER;

  constructor(public payload: Traveler) {
  }
}

export class UpdateTravelerSuccess implements Action {
  readonly type = UPDATE_TRAVELER_SUCCESS;
}

export class UpdateTravelerError implements Action {
  readonly type = UPDATE_TRAVELER_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a Traveler by id
 ****************************************/
export class RemoveTraveler implements Action {
  readonly type = DELETE_TRAVELER;

  constructor(public payload: number) {
  }
}

export class RemoveTravelerSuccess implements Action {
  readonly type = DELETE_TRAVELER_SUCCESS;

  constructor(public payload: Traveler) {
  }
}

export class RemoveTravelerError implements Action {
  readonly type = DELETE_TRAVELER_ERROR;

  constructor(public payload: Error) {
  }
}
