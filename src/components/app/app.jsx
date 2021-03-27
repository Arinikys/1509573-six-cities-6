import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import OfferPage from '../offer-page/offer-page';
import LoginPage from "../login-page/login-page";
import FavoritesPage from "../favorites-page/favorites-page";
import NotFoundPage from "../not-found-page/not-found-page";
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../const";

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.ROOT} component={MainPage} />
      <Route exact path={AppRoute.LOGIN} component={LoginPage} />
      <PrivateRoute exact
        path={AppRoute.FAVORITES}
        render={() => <FavoritesPage />}
      >
      </PrivateRoute>
      <Route exact path="/offer/:id?" component={OfferPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
