
import { Hotel } from '../../models/hotel';
import * as hotelsActions from './hotels.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Hotel[];
    selected: Hotel;
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

export function hotelReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all hotels actions
     ************************/
    case hotelsActions.GET_HOTELS:
      return {
        ...state,
        action: hotelsActions.GET_HOTELS,
        done: false,
        selected: null,
        error: null
      };
    case hotelsActions.GET_HOTELS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case hotelsActions.GET_HOTELS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET hotel by Id actions
     ************************/
    case hotelsActions.GET_HOTEL:
    return {
      ...state,
      action: hotelsActions.GET_HOTEL,
      done: false,
      selected: null,
      error: null
    };
    case hotelsActions.GET_HOTEL_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case hotelsActions.GET_HOTEL_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case hotelsActions.CREATE_HOTEL:
      return {
        ...state,
        selected: action.payload,
        action: hotelsActions.CREATE_HOTEL,
        done: false,
        error: null
      };
      case hotelsActions.CREATE_HOTEL_SUCCESS:
        {
          const newHotel = {
            ...state.selected,
            // Id: action.payload
          };
          const data = [
            ...state.data,
            newHotel
          ];
          return {
            ...state,
            data,
            selected: null,
            error: null,
            done: true
          };
        }
      case hotelsActions.CREATE_HOTEL_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case hotelsActions.UPDATE_HOTEL:
      return {
        ...state,
        selected: action.payload,
        action: hotelsActions.UPDATE_HOTEL,
        done: false,
        error: null
      };
    case hotelsActions.UPDATE_HOTEL_SUCCESS:
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
    case hotelsActions.UPDATE_HOTEL_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
     * DELETE hotel actions
     ************************/
    case hotelsActions.DELETE_HOTEL:
      {
        const selected = state.data.find(h => h.Id === action.payload);
        return {
          ...state,
          selected,
          action: hotelsActions.DELETE_HOTEL,
          done: false,
          error: null
        };
      }
    case hotelsActions.DELETE_HOTEL_SUCCESS:
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
    case hotelsActions.DELETE_HOTEL_ERROR:
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

export const getHotelsState = createFeatureSelector <State> ('hotels');
export const getAllHotels = createSelector(getHotelsState, (state: State) => state.data);
export const getHotel = createSelector(getHotelsState, (state: State) => {   
  if (state.action === hotelsActions.GET_HOTEL && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllHotels = createSelector(getHotelsState, (state: State) => 
  state.action === hotelsActions.GET_HOTELS && state.done && !state.error);