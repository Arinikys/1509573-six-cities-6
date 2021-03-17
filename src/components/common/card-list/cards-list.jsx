import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const CardsList = (props) => {
  const {offers, getActiveCard, updateFav} = props;
  const [activeOffer, setActiveOffer] = React.useState({});

  const handleCardMouseOver = (offer) => {
    setActiveOffer(offer);
    getActiveCard(activeOffer);
  };

  return (<>
    {offers.map((offer) => <Card key={offer.id} offer={offer} onMouseOver={handleCardMouseOver} onFavoriteButtonClick={updateFav}/>)}
  </>
  );
};

CardsList.propTypes = {
  offers: PropTypes.array.isRequired,
  getActiveCard: PropTypes.func.isRequired,
  updateFav: PropTypes.func.isRequired,
};

export default CardsList;
