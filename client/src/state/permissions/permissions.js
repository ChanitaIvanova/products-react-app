import { ADD_PERMISSIONS } from '../actionTypes';

export const Permissions = (state = { permissions: [] }, action) => {
  switch (action.type) {
      case ADD_PERMISSIONS:
          return {...state, permissions: action.payload};

      default:
          return state;
  }
};