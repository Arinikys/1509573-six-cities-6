import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {favorites} from './favorites';
import {ActionType} from '../action';
import {updateFav, fetchFavOffersList} from '../api-actions';
import {APIRoute} from '../../const';

const api = createAPI(() => {});
const favOffers = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": `Amsterdam`
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
];

describe(`Reducer 'favorites' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(favorites(undefined, {}))
      .toEqual({favOffers: [], onLoadFavOfferData: false});
  });

  it(`Reducer should update favOffers by load favOffers`, () => {
    const state = {favOffers: [], onLoadFavOfferData: false};
    const loadFavOffersAction = {
      type: ActionType.LOAD_FAV_OFFERS,
      payload: favOffers
    };

    expect(favorites(state, loadFavOffersAction))
      .toEqual({favOffers, onLoadFavOfferData: true});
  });

  it(`Reducer should return favOffers by update offer favorite status`, () => {
    const state = {favOffers: [], onLoadFavOfferData: false};
    const loadFavOffersAction = {
      type: ActionType.UPDATE_FAV
    };

    expect(favorites(state, loadFavOffersAction))
      .toEqual({favOffers: [], onLoadFavOfferData: false});
  });

});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favOffersLoader = fetchFavOffersList();

    apiMock
      .onGet(APIRoute.FAVORITES)
      .reply(200, [{fake: true}]);

    return favOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAV_OFFERS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /favorites/1/1`, () => {
    const id = 1;
    const status = 1;

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`${APIRoute.FAVORITES}/${id}/${status}`)
      .reply(200, [{fake: true}]);

    const dispatch = jest.fn();
    const updateFavStatus = updateFav(id, status);

    return updateFavStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FAV,
          payload: [{fake: true}],
        });
      });
  });

});
