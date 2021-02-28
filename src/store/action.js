export const ActionType = {
  CHANGE_CITY: `sixCities/changeCity`,
  FILTER_OFFERS: `sixCities/filterOffers`,
  LOAD_OFFERS: `sixCities/fetchOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  filteredOffers: () => ({
    type: ActionType.FILTER_OFFERS
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  })
};
