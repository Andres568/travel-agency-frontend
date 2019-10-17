
import { Reservation } from '../../models/reservation';
import * as reservationsActions from './reservations.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Reservation[];
    action: string;
    selected: Reservation;
    done: boolean;
    error?: Error;
}

export const initialState: State = {
    data: [],
    action: null,
    selected: null,
    done: false,
    error: null
  };

export function reservationReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all reservations actions
     ************************/
    case reservationsActions.GET_RESERVATIONS:
      return {
        ...state,
        action: reservationsActions.GET_RESERVATIONS,
        done: false,
        error: null
      };
    case reservationsActions.GET_RESERVATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case reservationsActions.GET_RESERVATIONS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET reservation by Id actions
     ************************/
    case reservationsActions.GET_RESERVATION:
    return {
      ...state,
      action: reservationsActions.GET_RESERVATION,
      done: false,
      selected: null,
      error: null
    };
    case reservationsActions.GET_RESERVATION_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case reservationsActions.GET_RESERVATION_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE reservation actions
       ************************/
      case reservationsActions.CREATE_RESERVATION:
      return {
        ...state,
        selected: action.payload,
        action: reservationsActions.CREATE_RESERVATION,
        done: false,
        error: null
      };
      case reservationsActions.CREATE_RESERVATION_SUCCESS:
        {
          const data = [
            ...state.data,
            action.payload
          ];
          return {
            ...state,
            data,
            error: null,
            done: true
          };
        }
      case reservationsActions.CREATE_RESERVATION_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE reservation actions
       ************************/
      case reservationsActions.UPDATE_RESERVATION:
      return {
        ...state,
        action: reservationsActions.UPDATE_RESERVATION,
        done: false,
        error: null
      };
    case reservationsActions.UPDATE_RESERVATION_SUCCESS:
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
    case reservationsActions.UPDATE_RESERVATION_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * DELETE reservation actions
     ************************/
    case reservationsActions.DELETE_RESERVATION:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: reservationsActions.DELETE_RESERVATION,
          done: false,
          error: null
        };
      }
    case reservationsActions.DELETE_RESERVATION_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload.id);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case reservationsActions.DELETE_RESERVATION_ERROR:
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

export const getReservationsState = createFeatureSelector <State> ('reservations');
export const getAllReservations = createSelector(getReservationsState, (state: State) => state.data);
export const getReservation = createSelector(getReservationsState, (state: State) => {   
  if (state.action === reservationsActions.GET_RESERVATION && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllReservations = createSelector(getReservationsState, (state: State) => 
  state.action === reservationsActions.GET_RESERVATIONS && state.done && !state.error);