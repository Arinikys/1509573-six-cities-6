import {ActionType} from '../action';
import {INIT_CITY} from '../../const';
import {filterOffers} from "../../filterOffers";
import {sortOffers} from "../../sortOffers";

const initialState = {
  offers: [],
  city: INIT_CITY,
  isDataLoaded: false,
};

const offers = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.LOAD_OFFERS:
      initialState.offers = action.payload;
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.FILTER_OFFERS:
      return {
        ...state,
        offers: filterOffers(state.city, initialState.offers),
      };
    case ActionType.SORT_OFFERS:
      return {
        ...state,
        offers: sortOffers([...state.offers], action.payload),
      };
  }

  return state;
};

export {offers};
