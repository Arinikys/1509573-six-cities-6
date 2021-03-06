import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        user: action.payload.data,
        authorizationStatus: action.payload.status === 200 ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH,
      };
    case ActionType.CHECK_AUTHORIZATION:
      return {
        ...state,
        user: action.payload.data,
        authorizationStatus: action.payload.status === 200 ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH,
      };
  }

  return state;
};

export {user};
