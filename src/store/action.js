export const ActionType = {
  CHANGE_CITY: `sixCities/changeCity`,
  FILTER_OFFERS: `sixCities/filterOffers`,
  LOAD_OFFERS: `sixCities/fetchOffers`,
  LOAD_OFFER: `sixCities/fetchOffer`,
  LOAD_NEAR_OFFERS: `sixCities/fetchNearOffers`,
  LOAD_COMMENTS: `sixCities/fetchComments`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  CHECK_AUTHORIZATION: `user/checkAuthorization`,
  REDIRECT_TO_ROUTE: `sixCities/redirectToRoute`,
  SORT_OFFERS: `sixCities/sortOffers`,
  ADD_COMMENTS: `sixCities/addComments`,
  ADD_COMMENTS_FAIL: `sixCities/addCommentsFail`,
  LOAD_FAV_OFFERS: `sixCities/loadFavOffers`,
  UPDATE_FAV: `sixCities/updateFav`,
  ADD_COMMENTS_FETCHING: `sixCities/addCommentsFetching`
};

export const ActionCreator = {
  sortOffers: (type) => ({
    type: ActionType.SORT_OFFERS,
    payload: type
  }),
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
  loadOffer: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer
  }),
  loadFavOffers: (offers) => ({
    type: ActionType.LOAD_FAV_OFFERS,
    payload: offers
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  loadNearOffers: (offer) => ({
    type: ActionType.LOAD_NEAR_OFFERS,
    payload: offer
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  checkAuthorization: (response) => ({
    type: ActionType.CHECK_AUTHORIZATION,
    payload: response,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  addComments: (response) => ({
    type: ActionType.ADD_COMMENTS,
    payload: response,
  }),
  addCommentsFail: (response) => ({
    type: ActionType.ADD_COMMENTS_FAIL,
    payload: response,
  }),
  addCommentsFetching: () => ({
    type: ActionType.ADD_COMMENTS_FETCHING,
  }),
  updateFav: (response) => ({
    type: ActionType.UPDATE_FAV,
    payload: response,
  })
};

