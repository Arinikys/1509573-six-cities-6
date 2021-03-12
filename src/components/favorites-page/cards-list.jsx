import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const CardsList = (props) => {
  const {offers} = props;
  const unicCities = new Set();
  offers.forEach(function(offer) {
    unicCities.add(offer.city.name);
  });
  const cities = Array.from(unicCities);

  return (<>
    <ul className="favorites__list">
      {cities.map((city)=> (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {[...offers].filter((offer) => offer.city.name === city).map((offer) => <Card key={offer.id} offer={offer}/>)}
          </div>
        </li>
      ))}
    </ul>
  </>
  );
};

CardsList.propTypes = {
  offers: PropTypes.array.isRequired,
};

export default CardsList;
