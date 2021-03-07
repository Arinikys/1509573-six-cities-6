import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {sortType, defaultConstType} from "../../const";

const Sort = ({onSortTypeChange}) => {
  const [isOpenState, setIsOpenState] = useState(false);
  const [sortTypeState, setSortType] = useState(defaultConstType);

  const formClickHandler = (currOpenState) => {
    setIsOpenState(!currOpenState);
  };

  const sortTypeHandler = (type) => {
    setSortType(type);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={(evt) => {
        evt.preventDefault();
        formClickHandler(isOpenState);
      }}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" >
        {sortType[sortTypeState].label}
      </span>
      <ul className={`places__options places__options--custom ${isOpenState ? `places__options--opened` : ``} `}>
        {Object.keys(sortType).map((type, index)=> (
          <li
            key={`type-${index}`}
            className={`places__option ${sortTypeState === type ? `places__option--active` : ``} `}
            tabIndex="0"
            onClick={(evt) => {
              evt.preventDefault();
              onSortTypeChange(type);
              sortTypeHandler(type);
            }}
          >
            {sortType[type].label}
          </li>
        ))}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
  currSortType: PropTypes.string.isRequired,
};

export default Sort;
