
import { Hotel } from '../../models/hotel';
import * as hotelsActions from './hotels.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Hotel[];
    action: string;
    selected: Hotel;
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
        error: null
      };
    case hotelsActions.GET_HOTELS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case hotelsActions.GET_HOTELS_ERROR:
      return {
        ...state,
        done: true,
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
       * CREATE hotel actions
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
      case hotelsActions.CREATE_HOTEL_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE hotel actions
       ************************/
      case hotelsActions.UPDATE_HOTEL:
      return {
        ...state,
        action: hotelsActions.UPDATE_HOTEL,
        done: false,
        error: null
      };
    case hotelsActions.UPDATE_HOTEL_SUCCESS:
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
        const selected = state.data.find(h => h.id === action.payload);
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
        const data = state.data.filter(h => h.id !== action.payload.id);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case hotelsActions.DELETE_HOTEL_ERROR:
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