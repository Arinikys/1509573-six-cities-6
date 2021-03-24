import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, AppRoute, INIT_CITY, loadStatus} from '../../const';
import App from './app';
import '@testing-library/jest-dom';

const mockStore = configureStore({});
describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  // it(`Render 'MainPage' when user navigate to '/' url`, () => {
  //   const history = createMemoryHistory();
  //   const store = mockStore({
  //     USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
  //     OFFERS: {offers: [], city: INIT_CITY, isDataLoaded: false}
  //   });
  //   render(
  //       <redux.Provider store={store}>
  //         <Router history={history}>
  //           <App />
  //         </Router>
  //       </redux.Provider>
  //   );
  //
  //   expect(screen.getByText(new RegExp(`aces to stay in`, `i`))).toBeInTheDocument();
  // });

  // it(`Render 'Offer' when user navigate to '/offer/:id?' url`, () => {
  //   const history = createMemoryHistory();
  //   const store = mockStore({
  //     USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
  //     OFFER: {offer: {}, nearOffers: [], onLoadOfferData: false, onLoadNearOffersData: false},
  //     COMMENTS: {comments: [], onLoadCommentsData: loadStatus.SUCCESS, onLoadCommentsFormData: loadStatus.SUCCESS, commentsFormError: ``}
  //   });
  //   history.push(AppRoute.OFFER);
  //
  //   render(
  //       <redux.Provider store={store}>
  //         <Router history={history}>
  //           <App />
  //         </Router>
  //       </redux.Provider>
  //   );
  //
  //   expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  //   expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  // });

  it(`Render 'AuthScreen' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}}
    });
    history.push(AppRoute.LOGIN);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Amsterdam/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, user: {}},
      FAVORITES: {favOffers: [], onLoadFavOfferData: true}
    });
    history.push(AppRoute.FAVORITES);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it(`Render 'NotFoundPage' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
  });
});
