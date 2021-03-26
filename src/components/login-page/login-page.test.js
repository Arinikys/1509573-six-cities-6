import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginPage from "./login-page";
import {AppRoute, AuthorizationStatus} from "../../const";
import '@testing-library/jest-dom';

const mockStore = configureStore({});

it(`Render 'LoginPage' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}}
  });
  history.push(AppRoute.LOGIN);

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </redux.Provider>
  );

  userEvent.type(screen.getByTestId(`email`), `test`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
