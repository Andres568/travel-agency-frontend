
import { EmergencyContact } from '../../models/emergencyContact';
import * as emergencyContactsActions from './emergencyContacts.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: EmergencyContact[];
    selected: EmergencyContact;
    action: string;
    done: boolean;
    error?: Error;
}

export const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
  };

export function emergencyContactReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all emergencyContacts actions
     ************************/
    case emergencyContactsActions.GET_EMERGENCYCONTACTS:
      return {
        ...state,
        action: emergencyContactsActions.GET_EMERGENCYCONTACTS,
        done: false,
        error: null
      };
    case emergencyContactsActions.GET_EMERGENCYCONTACTS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case emergencyContactsActions.GET_EMERGENCYCONTACTS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET emergencyContact by Id actions
     ************************/
    case emergencyContactsActions.GET_EMERGENCYCONTACT:
    return {
      ...state,
      action: emergencyContactsActions.GET_EMERGENCYCONTACT,
      done: false,
      selected: null,
      error: null
    };
    case emergencyContactsActions.GET_EMERGENCYCONTACT_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case emergencyContactsActions.GET_EMERGENCYCONTACT_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case emergencyContactsActions.CREATE_EMERGENCYCONTACT:
      return {
        ...state,
        selected: action.payload,
        action: emergencyContactsActions.CREATE_EMERGENCYCONTACT,
        done: false,
        error: null
      };
      case emergencyContactsActions.CREATE_EMERGENCYCONTACT_SUCCESS:
        {
 
          const data = [
            ...state.data,
            action.payload
          ];
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          };
        }
      case emergencyContactsActions.CREATE_EMERGENCYCONTACT_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case emergencyContactsActions.UPDATE_EMERGENCYCONTACT:
      return {
        ...state,
        action: emergencyContactsActions.UPDATE_EMERGENCYCONTACT,
        done: false,
        error: null
      };
    case emergencyContactsActions.UPDATE_EMERGENCYCONTACT_SUCCESS:
      {
        const index = state
          .data
          .findIndex(c => c.id === action.payload.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            action.payload,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            error: null
          };
        }
        return state;
      }
    case emergencyContactsActions.UPDATE_EMERGENCYCONTACT_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

    /*************************
     * DELETE emergencyContact actions
     ************************/
    case emergencyContactsActions.DELETE_EMERGENCYCONTACT:
      {
        const selected = state.data.find(h => h.id === action.payload);
        console.log(action.payload)
        return {
          ...state,
          selected,
          action: emergencyContactsActions.DELETE_EMERGENCYCONTACT,
          done: false,
          error: null
        };
      }
    case emergencyContactsActions.DELETE_EMERGENCYCONTACT_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload.id);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case emergencyContactsActions.DELETE_EMERGENCYCONTACT_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/

export const getEmergencyContactsState = createFeatureSelector <State> ('emergencyContacts');
export const getAllEmergencyContacts = createSelector(getEmergencyContactsState, (state: State) => state.data);
export const getEmergencyContact = createSelector(getEmergencyContactsState, (state: State) => {   
  if (state.action === emergencyContactsActions.GET_EMERGENCYCONTACT && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllEmergencyContacts = createSelector(getEmergencyContactsState, (state: State) => 
  state.action === emergencyContactsActions.GET_EMERGENCYCONTACTS && state.done && !state.error);