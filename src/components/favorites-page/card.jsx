import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const Card = (props) => {
  const {offer, onFavBtnClick} = props;
  const history = useHistory();
  const [favLabelState, setFavLabelState] = useState(offer.is_favorite);

  const favBtnClickHandler = (state) => {
    setFavLabelState(!state);
    onFavBtnClick(offer.id, offer.is_favorite ? 0 : 1);
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a onClick={() => history.push(`/offer/${offer.id}`)}>
          <img className="place-card__image" src={offer.preview_image} width="150" height="110" alt="Place image"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={(evt) => {
              evt.preventDefault();
              favBtnClickHandler(favLabelState);
            }}
          >
            {offer.is_favorite && favLabelState
              ? <svg className="place-card__bookmark-icon" width="18" height="19" style={{stroke: `#4481c3`, fill: `#4481c3`}}>
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              : <svg className="place-card__bookmark-icon" width="18" height="19" style = {{stroke: `#b8b8b8`, fill: `#fff`}}>
                <use xlinkHref="#icon-bookmark"/>
              </svg>
            }
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${parseFloat(offer.rating) * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={() => history.push(`/offer/${offer.id}`)}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  offer: PropTypes.object.isRequired,
  onFavBtnClick: PropTypes.func.isRequired,
};
export default Card;
