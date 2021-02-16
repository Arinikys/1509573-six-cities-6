import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const CardsList = (props) => {
  const {offers} = props;

  return (<>
    {offers.map((offer) => <Card key={offer.id} offer={offer}/>)}
  </>
  );
};

CardsList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default CardsList;
