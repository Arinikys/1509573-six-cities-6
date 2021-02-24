export const filterOffers = (city, offers) => {
  return offers.filter((offer) => offer.city.name === city);
};
