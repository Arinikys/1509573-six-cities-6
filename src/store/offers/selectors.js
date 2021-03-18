import {NameSpace} from '../root-reducer';

export const getOffers = (state) => state[NameSpace.OFFERS].offers;
export const getCity = (state) => state[NameSpace.OFFERS].city;
export const getIsDataLoaded = (state) => state[NameSpace.OFFERS].isDataLoaded;
