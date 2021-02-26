import {INIT_CITY} from '../const';
import offers from "../mocks/offers";
import {ActionType} from './action';
import {filterOffers} from '../filterOffers';

const initialState = {
  offers,
  city: INIT_CITY
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };
    case ActionType.FILTER_OFFERS:
      return {
        ...state,
        offers: filterOffers(state.city, initialState.offers)
      };
    default:
      return state;
  }
};


export {reducer};
