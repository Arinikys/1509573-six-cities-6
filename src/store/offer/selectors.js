import {NameSpace} from '../root-reducer';

export const getOffer = (state) => state[NameSpace.OFFER].offer;
export const getNearOffers = (state) => state[NameSpace.OFFER].nearOffers;
export const getOnLoadOfferData = (state) => state[NameSpace.OFFER].onLoadOfferData;
export const getOnLoadNearOffersData = (state) => state[NameSpace.OFFER].onLoadNearOffersData;
