
import { Room } from '../../models/room';
import * as roomsActions from './rooms.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppAction } from '../app.actions';

export interface State{
    data: Room[];
    selected: Room;
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

export function roomReducer(state = initialState, action: AppAction): State {
  switch (action.type) {
       /*************************
     * GET all rooms actions
     ************************/
    case roomsActions.GET_ROOMS:
      return {
        ...state,
        action: roomsActions.GET_ROOMS,
        done: false,
        error: null
      };
    case roomsActions.GET_ROOMS_SUCCESS:
      
      return {
        ...state,
        data: action.payload,
        done: true,
        error: null
      };
    case roomsActions.GET_ROOMS_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

      /*************************
     * GET room by Id actions
     ************************/
    case roomsActions.GET_ROOM:
    return {
      ...state,
      action: roomsActions.GET_ROOM,
      done: false,
      selected: null,
      error: null
    };
    case roomsActions.GET_ROOM_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case roomsActions.GET_ROOM_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

        /*************************
       * CREATE create actions
       ************************/
      case roomsActions.CREATE_ROOM:
      return {
        ...state,
        selected: action.payload,
        action: roomsActions.CREATE_ROOM,
        done: false,
        error: null
      };
      case roomsActions.CREATE_ROOM_SUCCESS:
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
      case roomsActions.CREATE_ROOM_ERROR:
        return {
          ...state,
          selected: null,
          done: true,
          error: action.payload
        };
        
        /*************************
       * UPDATE game actions
       ************************/
      case roomsActions.UPDATE_ROOM:
      return {
        ...state,
        action: roomsActions.UPDATE_ROOM,
        done: false,
        error: null
      };
    case roomsActions.UPDATE_ROOM_SUCCESS:
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
    case roomsActions.UPDATE_ROOM_ERROR:
      return {
        ...state,
        done: true,
        error: action.payload
      };

    /*************************
     * DELETE room actions
     ************************/
    case roomsActions.DELETE_ROOM:
      {
        const selected = state.data.find(h => h.id === action.payload);
        console.log(action.payload)
        return {
          ...state,
          selected,
          action: roomsActions.DELETE_ROOM,
          done: false,
          error: null
        };
      }
    case roomsActions.DELETE_ROOM_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== action.payload.id);
        return {
          ...state,
          data,
          error: null,
          done: true
        };
      }
    case roomsActions.DELETE_ROOM_ERROR:
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

export const getRoomsState = createFeatureSelector <State> ('rooms');
export const getAllRooms = createSelector(getRoomsState, (state: State) => state.data);
export const getRoom = createSelector(getRoomsState, (state: State) => {   
  if (state.action === roomsActions.GET_ROOM && state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isGetAllRooms = createSelector(getRoomsState, (state: State) => 
  state.action === roomsActions.GET_ROOMS && state.done && !state.error);