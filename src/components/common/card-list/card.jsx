import React, {useState} from 'react';
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";

const Card = (props) => {
  const {offer, onMouseOver, onFavoriteButtonClick, cardClass} = props;
  const history = useHistory();
  const [favoriteLabel, setFavoriteLabel] = useState(offer.is_favorite);

  return (
    <article
      className={`${cardClass === `favorites` ? `favorites__card` : `cities__place-card`} place-card`}
      onMouseOver={(evt) => {
        evt.preventDefault();
        onMouseOver(offer.id);
      }}
    >
      {offer.is_premium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
      <div className={`${cardClass || `cities`}__image-wrapper place-card__image-wrapper`}>
        <a onClick={() => history.push(`/offer/${offer.id}`)}>
          {cardClass === `favorites`
            ? <img className="place-card__image" src={offer.images[0]} width="150" height="110" alt="Place image"/>
            : <img className="place-card__image" src={offer.images[0]} width="260" height="200" alt="Place image"/>
          }
        </a>
      </div>
      <div className={`${cardClass || `cities`}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.is_favorite && favoriteLabel ? `place-card__bookmark-button--active` : ``} `}
            type="button" onClick={(evt) => {
              evt.preventDefault();
              setFavoriteLabel(!favoriteLabel);
              onFavoriteButtonClick(offer.id, favoriteLabel ? 0 : 1);
            }}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${parseFloat(offer.rating) * 20}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            onClick={() => history.push(`/offer/${offer.id}`)}
          >{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  offer: PropTypes.object.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  cardClass: PropTypes.string
};
export default Card;
