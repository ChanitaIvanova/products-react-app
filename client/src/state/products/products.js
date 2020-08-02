import { ADD_PRODUCTS } from '../actionTypes';

export const Products = (state = { products: [], areLoaded: false }, action) => {
  switch (action.type) {
      case ADD_PRODUCTS:
          return {...state, products: action.payload, areLoaded: true};

      default:
          return state;
  }
};