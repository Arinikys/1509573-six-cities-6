import {INIT_CITY, AuthorizationStatus} from '../const';
import {ActionType} from './action';
import {filterOffers} from '../filterOffers';

const initialState = {
  offers: [],
  city: INIT_CITY,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case ActionType.LOAD_OFFERS:
      initialState.offers = action.payload;
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true
      };
    case ActionType.FILTER_OFFERS:
      return {
        ...state,
        offers: filterOffers(state.city, initialState.offers)
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
      };
    case ActionType.CHECK_AUTHORIZATION:
      return {
        ...state,
        user: action.payload.data
      };
  }
  return state;
};

export {reducer};
