import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const CardsList = (props) => {
  const {offers} = props;
  const [activeOffer, setActiveOffer] = React.useState({});

  const handleCardMouseOver = (offer) => {
    setActiveOffer(offer);
  };

  return (<>
    {offers.map((offer) => <Card key={offer.id} offer={offer} onMouseOver={handleCardMouseOver} />)}
  </>
  );
};

CardsList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default CardsList;
