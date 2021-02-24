import React from 'react';
import PropTypes from 'prop-types';
import City from "./city";
import {CITIES} from "../../../const";

const CitiesList = ({getActiveCity, activeCity}) => {

  const cities = CITIES;

  const handleCityClick = (city) => {
    getActiveCity(city);
  };
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city, index) => <City key={`city-${index}`} city={city} isActiveCity={activeCity === city} onClick={handleCityClick} />)}
      </ul>
    </section>
  );
};

CitiesList.propTypes = {
  getActiveCity: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired
};

export default CitiesList;
