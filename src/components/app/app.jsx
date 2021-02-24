import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import OfferPage from '../offer-page/offer-page';
import LoginPage from "../login-page/login-page";
import FavoritesPage from "../favorites-page/favorites-page";
import NotFoundPage from "../not-found-page/not-found-page";

const App = (props) => {
  const {offers, comments} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage offers={offers}/>
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/favorites">
          <FavoritesPage offers={offers}/>
        </Route>
        <Route exact path="/offer/:id?">
          <OfferPage offer={offers[0]} offers={offers} comments={comments}/>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired
};

export default App;
