import {ActionType} from '../action';

const initialState = {
  offer: {},
  nearOffers: [],
  onLoadOfferData: false,
  onLoadNearOffersData: false,
};

const offer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload,
        onLoadOfferData: true,
      };
    case ActionType.LOAD_NEAR_OFFERS:
      return {
        ...state,
        nearOffers: action.payload,
        onLoadNearOffersData: true,
      };
  }

  return state;
};

export {offer};
