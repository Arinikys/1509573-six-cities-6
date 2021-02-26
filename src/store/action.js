
export const ActionType = {
  CHANGE_CITY: `sixCities/changeCity`,
  FILTER_OFFERS: `sixCities/filterOffers`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  filteredOffers: () => ({
    type: ActionType.FILTER_OFFERS
  }),
};
