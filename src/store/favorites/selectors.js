import {NameSpace} from '../root-reducer';

export const getFavOffers = (state) => state[NameSpace.FAVORITES].favOffers;
export const getOnLoadFavOfferData = (state) => state[NameSpace.FAVORITES].onLoadFavOfferData;

