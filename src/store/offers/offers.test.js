import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {offers} from './offers';
import {ActionType} from '../action';
import {INIT_CITY} from '../../const';
import {fetchOffersList} from '../api-actions';
import {APIRoute, sortType} from '../../const';

const api = createAPI(() => {});
const offersList = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": INIT_CITY
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "avatar_url": `img/1.png`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`
    },
    "id": 1,
    "images": [`img/1.png`, `img/2.png`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `img/1.png`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`
  },
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": `Paris`
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "avatar_url": `img/1.png`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`
    },
    "id": 2,
    "images": [`img/1.png`, `img/2.png`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `img/1.png`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`
  }];

describe(`Reducer 'offers' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offers(undefined, {}))
      .toEqual({
        offers: [],
        city: INIT_CITY,
        isDataLoaded: false
      });
  });

  it(`Reducer should update offers by load offers`, () => {
    const state = {offers: [], isDataLoaded: false, city: INIT_CITY};
    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offersList
    };

    expect(offers(state, loadOffersAction))
      .toEqual({offers: offersList, isDataLoaded: true, city: INIT_CITY});
  });

  it(`Reducer should update city by change city`, () => {
    const state = {offers: [], isDataLoaded: false, city: INIT_CITY};
    const updateCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Test`
    };

    expect(offers(state, updateCityAction))
      .toEqual({offers: [], isDataLoaded: false, city: `Test`});
  });

  it(`Reducer should filter offer by city`, () => {
    const state = {offers: [], isDataLoaded: true, city: INIT_CITY};
    const filterOffersAction = {
      type: ActionType.FILTER_OFFERS,
    };

    expect(offers(state, filterOffersAction))
      .toEqual({offers: [], isDataLoaded: true, city: INIT_CITY});
  });

  it(`Reducer should sort offer by type`, () => {
    const state = {offers: [], isDataLoaded: true, city: INIT_CITY};
    const sortOffersAction = {
      type: ActionType.SORT_OFFERS,
      payload: sortType.ACS_PRICE
    };

    expect(offers(state, sortOffersAction))
      .toEqual({offers: [], isDataLoaded: true, city: INIT_CITY});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffersList();

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});

