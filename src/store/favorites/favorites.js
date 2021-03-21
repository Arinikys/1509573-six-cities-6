import {ActionType} from '../action';

const initialState = {
  favOffers: [],
  onLoadFavOfferData: false,
};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAV_OFFERS:
      return {
        ...state,
        favOffers: action.payload,
        onLoadFavOfferData: true,
      };
    case ActionType.UPDATE_FAV:
      return {
        ...state,
      };
  }

  return state;
};

export {favorites};
