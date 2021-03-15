export const INIT_CITY = `Paris`;
export const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
export const REQUEST_TIMEOUT = 5000;
export const BACKEND_URL = `https://6.react.pages.academy/six-cities`;

export const AppRoute = {
  LOGIN: `/login`,
  OFFER: `/offer`,
  ROOT: `/`,
  FAVORITES: `/favorites`,
};

export const APIRoute = {
  OFFERS: `/hotels`,
  LOGIN: `/login`,
  COMMENTS: `/comments`,
  FAVORITES: `/favorite`,
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const defaultConstType = `POPULAR`;

export const sortType = {
  POPULAR: {
    value: `POPULAR`,
    label: `Popular`,
  },
  ACS_PRICE: {
    value: `ACS_PRICE`,
    label: `Price: low to high`,
  },
  DESC_PRICE: {
    value: `DESC_PRICE`,
    label: `Price: high to low`,
  },
  RATE: {
    value: `RATE`,
    label: `Top rated first`,
  },
};

export const loadStatus = {
  IDLE: `IDLE`,
  FETCHING: `FETCHING`,
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
};
