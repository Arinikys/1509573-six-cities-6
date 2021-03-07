import {sortType} from "./const";

export const sortOffers = (offers, type) => {
  switch (type) {
    case sortType.POPULAR.value :
      return offers;
    case sortType.ACS_PRICE.value :
      return offers.sort(function (a, b) {
        return a.price - b.price;
      });
    case sortType.DESC_PRICE.value :
      return offers.sort(function (a, b) {
        return b.price - a.price;
      });
    case sortType.RATE.value :
      return offers.sort(function (a, b) {
        return a.rating - b.rating;
      });
    default:
      return offers;
  }
};
