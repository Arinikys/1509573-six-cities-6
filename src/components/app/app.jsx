import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import OfferPage from '../offer-page/offer-page';
import LoginPage from "../login-page/login-page";
import FavoritesPage from "../favorites-page/favorites-page";
import NotFoundPage from "../not-found-page/not-found-page";

const App = (props) => {
  const {cards} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage cards={cards}/>
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
        <Route exact path="/offer/:id?" component={OfferPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  cards: PropTypes.array,
};

export default App;
