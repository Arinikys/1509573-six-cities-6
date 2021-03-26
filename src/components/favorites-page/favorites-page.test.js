import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import FavoritesPage from "./favorites-page";
import {AppRoute, AuthorizationStatus} from "../../const";
import '@testing-library/jest-dom';

const mockStore = configureStore({});

it(`Render 'LoginPage' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
    FAVORITES: {favOffers: [], onLoadFavOfferData: true}
  });
  history.push(AppRoute.FAVORITES);

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <FavoritesPage />
        </Router>
      </redux.Provider>
  );
  expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
});
