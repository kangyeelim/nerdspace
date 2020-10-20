import { combineReducers } from 'redux';
import { UPDATE_PROFILE, DELETE_PROFILE, UPDATE_TOKEN, DELETE_TOKEN } from './actions';


const profileReducer = (state=[], action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      var newState = [];
      newState.push(action.payload);
      return newState;
    case DELETE_PROFILE:
      var emptyState = [];
      return emptyState;
    default:
      return state;
  }
}

const tokenReducer = (state=[], action) => {
  switch(action.type) {
    case UPDATE_TOKEN:
      var newState = [];
      newState.push(action.payload);
      return newState;
    case DELETE_TOKEN:
      var emptyState = [];
      return emptyState;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  profile: profileReducer,
  token: tokenReducer
})
