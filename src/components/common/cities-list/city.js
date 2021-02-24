import React from 'react';
import PropTypes from 'prop-types';

const City = ({city, onClick, isActiveCity}) => {

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link ${isActiveCity ? `tabs__item--active` : ``} tabs__item`}
        onClick={(evt) => {
          evt.preventDefault();
          onClick(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActiveCity: PropTypes.bool,
};

export default City;
