import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import OfferPage from '../offer-page/offer-page';
import LoginPage from "../login-page/login-page";
import FavoritesPage from "../favorites-page/favorites-page";
import NotFoundPage from "../not-found-page/not-found-page";
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../const";
import browserHistory from "../../browser-history";

const App = (props) => {
  const {offers} = props;
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={MainPage} />
        <Route exact path={AppRoute.LOGIN} component={LoginPage} />
        <PrivateRoute exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesPage offers={offers}/>}
        >
        </PrivateRoute>
        <Route exact path="/offer/:id?" component={OfferPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default App;
