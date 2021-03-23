import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {offer} from './offer';
import {ActionType} from '../action';
import {fetchOffer, fetchNearOffers} from '../api-actions';
import {APIRoute} from '../../const';

const api = createAPI(() => {});
const offerInfo = {
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
};

const nearOffersList = [
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
  }
];

describe(`Reducer 'offer' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(offer(undefined, {}))
      .toEqual({
        offer: {},
        nearOffers: [],
        onLoadOfferData: false,
        onLoadNearOffersData: false,
      });
  });

  it(`Reducer should update offer by load offer`, () => {
    const state = {offer: {}, onLoadOfferData: false};
    const loadOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: offerInfo
    };

    expect(offer(state, loadOfferAction))
      .toEqual({offer: offerInfo, onLoadOfferData: true});
  });

  it(`Reducer should update nearOffers by load nearOffers`, () => {
    const state = {nearOffers: [], onLoadNearOffersData: false};
    const loadNearOffersAction = {
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: nearOffersList
    };

    expect(offer(state, loadNearOffersAction))
      .toEqual({nearOffers: nearOffersList, onLoadNearOffersData: true});
  });

});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /hotel/1`, () => {
    const id = 1;
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(`${APIRoute.OFFERS}/${id}`)
      .reply(200, [{fake: true}]);

    const dispatch = jest.fn();
    const offerLoader = fetchOffer(id, status);

    return offerLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: [{fake: true}],
        });
      });
  });

  // it(`Should make a correct API call to /hotel/1/nearby`, () => {
  //   const id = 1;
  //
  //   const apiMock = new MockAdapter(api);
  //   apiMock
  //     .onGet(`${APIRoute.OFFERS}/${id}/nearby`)
  //     .reply(200, [{fake: true}]);
  //
  //   const dispatch = jest.fn();
  //   const nearOfferListLoader = fetchNearOffers(id);
  //
  //   return nearOfferListLoader(dispatch, () => {}, api)
  //     .then(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(1);
  //       expect(dispatch).toHaveBeenNthCalledWith(1, {
  //         type: ActionType.LOAD_NEAR_OFFERS,
  //         payload: [{fake: true}],
  //       });
  //     });
  // });
});
