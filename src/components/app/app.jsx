import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page';

const App = (props) => {
  const {cards} = props;
  return (
    <MainPage cards={cards}/>
  );
};

App.propTypes = {
  cards: PropTypes.array,
};

export default App;
