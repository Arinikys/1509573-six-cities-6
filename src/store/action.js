export const ActionType = {
  CHANGE_CITY: `sixCities/changeCity`,
  FILTER_OFFERS: `sixCities/filterOffers`,
  LOAD_OFFERS: `sixCities/fetchOffers`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  CHECK_AUTHORIZATION: `user/checkAuthorization`,
  REDIRECT_TO_ROUTE: `sixCities/redirectToRoute`,
  GET_CREDENTIALS: `user/getCredentials`
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
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  checkAuthorization: (status) => ({
    type: ActionType.CHECK_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  })
};
