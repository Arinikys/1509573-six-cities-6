import {INIT_CITY, AuthorizationStatus} from '../const';
import {ActionType} from './action';
import {filterOffers} from '../filterOffers';
import {sortOffers} from "../sortOffers";

const initialState = {
  offers: [],
  city: INIT_CITY,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
  comments: [],
  offer: {},
  nearOffers: [],
  onLoadOfferData: false,
  onLoadNearOffersData: false,
  onLoadCommentsData: false,
  onLoadCommentsFormData: false,
  commentsFormError: ``,
};

const reducer = (state = initialState, action) => {
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
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload,
        onLoadOfferData: true,
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        onLoadCommentsData: true,
      };
    case ActionType.LOAD_NEAR_OFFERS:
      return {
        ...state,
        nearOffers: action.payload,
        onLoadNearOffersData: true,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.ADD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        onLoadCommentsFormData: true,
        commentsFormError: ``,
      };
    case ActionType.ADD_COMMENTS_FAIL:
      return {
        ...state,
        commentsFormError: `action.payload.error`,
        onLoadCommentsFormData: true,
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

export {reducer};
