import * as ActionTypes from './actionTypes';

export function loginUser(json){
  return {
    type:ActionTypes.LOGIN_USER,
    payload: {
      token:json.token,
      user:json.user
    }
  }
}
