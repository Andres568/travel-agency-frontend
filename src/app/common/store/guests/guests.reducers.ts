
import { Guest } from '../../models/guest';
import * as guestsActions from './guests.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Guest[];
    selected: Guest;
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

export function guestReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all guests actions
     ************************/
    case guestsActions.GET_GUESTS:
      return {
        ...state,
        action: guestsActions.GET_GUESTS,
        done: false,
        error: null
      };
    case guestsActions.GET_GUESTS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case guestsActions.GET_GUESTS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET guest by Id actions
     ************************/
    case guestsActions.GET_GUEST:
    return {
      ...state,
      action: guestsActions.GET_GUEST,
      done: false,
      selected: null,
      error: null
    };
    case guestsActions.GET_GUEST_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case guestsActions.GET_GUEST_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case guestsActions.CREATE_GUEST:
      return {
        ...state,
        selected: action.payload,
        action: guestsActions.CREATE_GUEST,
        done: false,
        error: null
      };
      case guestsActions.CREATE_GUEST_SUCCESS:
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
      case guestsActions.CREATE_GUEST_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case guestsActions.UPDATE_GUEST:
      return {
        ...state,
        action: guestsActions.UPDATE_GUEST,
        done: false,
        error: null
      };
    case guestsActions.UPDATE_GUEST_SUCCESS:
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
    case guestsActions.UPDATE_GUEST_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

    /*************************
     * DELETE guest actions
     ************************/
    case guestsActions.DELETE_GUEST:
      {
        const selected = state.data.find(h => h.id === action.payload);
        console.log(action.payload)
        return {
          ...state,
          selected,
          action: guestsActions.DELETE_GUEST,
          done: false,
          error: null
        };
      }
    case guestsActions.DELETE_GUEST_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload.id);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case guestsActions.DELETE_GUEST_ERROR:
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

export const getGuestsState = createFeatureSelector <State> ('guests');
export const getAllGuests = createSelector(getGuestsState, (state: State) => state.data);
export const getGuest = createSelector(getGuestsState, (state: State) => {   
  if (state.action === guestsActions.GET_GUEST && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllGuests = createSelector(getGuestsState, (state: State) => 
  state.action === guestsActions.GET_GUESTS && state.done && !state.error);