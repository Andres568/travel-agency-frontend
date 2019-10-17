import { Action } from '@ngrx/store';
import { EmergencyContact} from '../../models/emergencyContact';


export const GET_EMERGENCYCONTACTS = '[ALL] EmergencyContacts';
export const GET_EMERGENCYCONTACTS_SUCCESS = '[ALL] EmergencyContacts Success';
export const GET_EMERGENCYCONTACTS_ERROR = '[ALL] EmergencyContacts Error';

export const GET_EMERGENCYCONTACT = '[GET] EMERGENCYCONTACT';
export const GET_EMERGENCYCONTACT_SUCCESS = '[GET] EmergencyContacts Success';
export const GET_EMERGENCYCONTACT_ERROR = '[GET] EmergencyContacts Error';

export const CREATE_EMERGENCYCONTACT = '[CREATE] EMERGENCYCONTACT';
export const CREATE_EMERGENCYCONTACT_SUCCESS = '[CREATE] EMERGENCYCONTACT Success';
export const CREATE_EMERGENCYCONTACT_ERROR = '[CREATE] EMERGENCYCONTACT Error';

export const DELETE_EMERGENCYCONTACT = '[DELETE] EMERGENCYCONTACT';
export const DELETE_EMERGENCYCONTACT_SUCCESS = '[DELETE] EMERGENCYCONTACT Success';
export const DELETE_EMERGENCYCONTACT_ERROR = '[DELETE] EMERGENCYCONTACT Error';

export const UPDATE_EMERGENCYCONTACT = '[UPDATE] EMERGENCYCONTACT';
export const UPDATE_EMERGENCYCONTACT_SUCCESS = '[UPDATE] EMERGENCYCONTACT Success';
export const UPDATE_EMERGENCYCONTACT_ERROR = '[UPDATE] EMERGENCYCONTACT Error';


/****************************************
 * GET all the EmergencyContacts
 ****************************************/
export class GetAllEmergencyContacts implements Action {
    readonly type = GET_EMERGENCYCONTACTS;
    constructor(){}
}

export class GetAllEmergencyContactsSuccess implements Action {
  readonly type = GET_EMERGENCYCONTACTS_SUCCESS;

  constructor(public payload: EmergencyContact[]) {
  }
}

export class GetAllEmergencyContactsError implements Action {
  readonly type = GET_EMERGENCYCONTACTS_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * GET EmergencyContact by id
 ****************************************/
export class GetEmergencyContact implements Action {
  readonly type =GET_EMERGENCYCONTACT;

  constructor(public payload: number) {
  }
}

export class GetEmergencyContactSuccess implements Action {
  readonly type =GET_EMERGENCYCONTACT_SUCCESS;

  constructor(public payload: EmergencyContact) {
  }
}

export class GetEmergencyContactError implements Action {
  readonly type =GET_EMERGENCYCONTACT_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new EmergencyContact
 ****************************************/
export class AddEmergencyContact implements Action {
  readonly type = CREATE_EMERGENCYCONTACT;

  constructor(public payload: EmergencyContact) { }
}

export class AddEmergencyContactSuccess implements Action {
  readonly type = CREATE_EMERGENCYCONTACT_SUCCESS;

  constructor(public payload: EmergencyContact) { }
}

export class AddEmergencyContactError implements Action {
  readonly type = CREATE_EMERGENCYCONTACT_ERROR;

  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE EmergencyContact by id
 ****************************************/
export class UpdateEmergencyContact implements Action {
  readonly type = UPDATE_EMERGENCYCONTACT;

  constructor(public payload: EmergencyContact) {
  }
}

export class UpdateEmergencyContactSuccess implements Action {
  readonly type = UPDATE_EMERGENCYCONTACT_SUCCESS;

  constructor(public payload: EmergencyContact) { }
}

export class UpdateEmergencyContactError implements Action {
  readonly type = UPDATE_EMERGENCYCONTACT_ERROR;

  constructor(public payload: Error) {
  }
}
/****************************************
 * REMOVE a EmergencyContact by id
 ****************************************/
export class RemoveEmergencyContact implements Action {
  readonly type = DELETE_EMERGENCYCONTACT;

  constructor(public payload: number) {
  }
}

export class RemoveEmergencyContactSuccess implements Action {
  readonly type = DELETE_EMERGENCYCONTACT_SUCCESS;

  constructor(public payload: EmergencyContact) {
  }
}

export class RemoveEmergencyContactError implements Action {
  readonly type = DELETE_EMERGENCYCONTACT_ERROR;

  constructor(public payload: Error) {
  }
}
