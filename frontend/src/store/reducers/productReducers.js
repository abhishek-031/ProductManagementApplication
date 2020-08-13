import * as ActionTypes from '../actions/actionTypes';

const products = (state=[],action) => {
  switch(action.type){
    case ActionTypes.FETCH_DONE:
      return [ ...action.products];
    default:
      return state;
  }
}

export { products };