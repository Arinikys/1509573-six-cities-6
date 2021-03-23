import {
  ActionCreator,
  ActionType,
} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator changeCity returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    };

    expect(ActionCreator.changeCity(`Paris`)).toEqual(expectedAction);
  });

  it(`Action creator sortOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SORT_OFFERS,
      payload: `ACS_PRICE`
    };

    expect(ActionCreator.sortOffers(`ACS_PRICE`)).toEqual(expectedAction);
  });

  it(`Action creator filteredOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.FILTER_OFFERS,
    };

    expect(ActionCreator.filteredOffers()).toEqual(expectedAction);
  });

  it(`Action creator loadOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
    };

    expect(ActionCreator.loadOffers()).toEqual(expectedAction);
  });

  it(`Action creator loadOffer returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
    };

    expect(ActionCreator.loadOffer()).toEqual(expectedAction);
  });

  it(`Action creator loadFavOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAV_OFFERS,
    };

    expect(ActionCreator.loadFavOffers()).toEqual(expectedAction);
  });

  it(`Action creator loadComments returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
    };

    expect(ActionCreator.loadComments()).toEqual(expectedAction);
  });

  it(`Action creator loadNearOffers returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_NEAR_OFFERS,
    };

    expect(ActionCreator.loadNearOffers()).toEqual(expectedAction);
  });

  it(`Action creator requireAuthorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
    };

    expect(ActionCreator.requireAuthorization()).toEqual(expectedAction);
  });

  it(`Action creator checkAuthorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHECK_AUTHORIZATION,
    };

    expect(ActionCreator.checkAuthorization()).toEqual(expectedAction);
  });

  it(`Action creator redirectToRoute returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
    };

    expect(ActionCreator.redirectToRoute()).toEqual(expectedAction);
  });

  it(`Action creator addComments returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_COMMENTS,
    };

    expect(ActionCreator.addComments()).toEqual(expectedAction);
  });

  it(`Action creator addCommentsFail returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_COMMENTS_FAIL,
    };

    expect(ActionCreator.addCommentsFail()).toEqual(expectedAction);
  });

  it(`Action creator addCommentsFetching returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_COMMENTS_FETCHING,
    };

    expect(ActionCreator.addCommentsFetching()).toEqual(expectedAction);
  });

  it(`Action creator updateFav returns correct action`, () => {
    const expectedAction = {
      type: ActionType.UPDATE_FAV,
    };

    expect(ActionCreator.updateFav()).toEqual(expectedAction);
  });
});
