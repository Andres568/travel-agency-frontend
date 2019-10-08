
import { Traveler } from '../../models/traveler';
import * as travelersActions from './travelers.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Traveler[];
    selected: Traveler;
    action: string;
    done: boolean;
    error?: Error;
}

export const initialState: State = {
    data: null,
    selected: null,
    action: null,
    done: false,
    error: null
  };

export function travelerReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all travelers actions
     ************************/
    case travelersActions.GET_TRAVELERS:
      return {
        ...state,
        action: travelersActions.GET_TRAVELERS,
        done: false,
        selected: null,
        error: null
      };
    case travelersActions.GET_TRAVELERS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case travelersActions.GET_TRAVELERS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET traveler by Id actions
     ************************/
    case travelersActions.GET_TRAVELER:
    return {
      ...state,
      action: travelersActions.GET_TRAVELER,
      done: false,
      selected: null,
      error: null
    };
    case travelersActions.GET_TRAVELER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case travelersActions.GET_TRAVELER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case travelersActions.CREATE_TRAVELER:
      return {
        ...state,
        selected: action.payload,
        action: travelersActions.CREATE_TRAVELER,
        done: false,
        error: null
      };
      case travelersActions.CREATE_TRAVELER_SUCCESS:
        {
          const newTraveler = {
            ...state.selected,
            // Id: action.payload
          };
          const data = [
            ...state.data,
            newTraveler
          ];
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          };
        }
      case travelersActions.CREATE_TRAVELER_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case travelersActions.UPDATE_TRAVELER:
      return {
        ...state,
        selected: action.payload,
        action: travelersActions.UPDATE_TRAVELER,
        done: false,
        error: null
      };
    case travelersActions.UPDATE_TRAVELER_SUCCESS:
      {
        const index = state
          .data
          .findIndex(c => c.Id === state.selected.Id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case travelersActions.UPDATE_TRAVELER_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * DELETE traveler actions
     ************************/
    case travelersActions.DELETE_TRAVELER:
      {
        const selected = state.data.find(h => h.Id === action.payload);
        return {
          ...state,
          selected,
          action: travelersActions.DELETE_TRAVELER,
          done: false,
          error: null
        };
      }
    case travelersActions.DELETE_TRAVELER_SUCCESS:
      {
        const data = state.data.filter(h => h.Id !== state.selected.Id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case travelersActions.DELETE_TRAVELER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/

export const getTravelersState = createFeatureSelector <State> ('travelers');
export const getAllTravelers = createSelector(getTravelersState, (state: State) => state.data);
export const getTraveler = createSelector(getTravelersState, (state: State) => {   
  if (state.action === travelersActions.GET_TRAVELER && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllTravelers = createSelector(getTravelersState, (state: State) => 
  state.action === travelersActions.GET_TRAVELERS && state.done && !state.error);