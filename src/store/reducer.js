import {INIT_CITY} from '../const';
import {ActionType} from './action';
import {filterOffers} from '../filterOffers';

const initialState = {
  offers: [],
  city: INIT_CITY,
  isDataLoaded: false,
  authorizationStatus: false,
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
        authorizationStatus: action.payload.status === 200,
        user: action.payload.data
      };
  }
  return state;
};

export {reducer};
