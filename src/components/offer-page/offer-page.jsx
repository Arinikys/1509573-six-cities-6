import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import ReviewForm from "./review-form";
import ReviewList from "./review-list";
import CardsList from "../common/card-list/cards-list";
import Map from "../common/map/map";
import Header from "../common/header/header";
import {AuthorizationStatus, loadStatus} from "../../const";
import {connect} from "react-redux";
import {fetchOffer, fetchNearOffers, fetchComments, updateFav} from "../../store/api-actions";
import LoadingScreen from "../loading-screen/loading-screen";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {getComments, getOnLoadCommentsData} from "../../store/comments/selectors";
import {getOffer, getNearOffers, getOnLoadOfferData, getOnLoadNearOffersData} from "../../store/offer/selectors";

const OfferPage = (props) => {
  const {
    authorizationStatus,
    onLoadOffer,
    offer,
    onLoadOfferData,
    nearOffers,
    onLoadNearOffersData,
    onLoadNearOffers,
    comments,
    onLoadComments,
    onLoadCommentsData,
    onUpdateFav
  } = props;
  const offerId = props.match.params.id;
  const [favoriteLabel, setFavoriteLabel] = useState(offer.is_favorite);

  useEffect(() => {
    if (!onLoadOfferData) {
      onLoadOffer(offerId);
    }

    if (!onLoadNearOffersData) {
      onLoadNearOffers(offerId);
    }

    if (onLoadCommentsData !== loadStatus.SUCCESS) {
      onLoadComments(offerId);
    }
  }, [onLoadOfferData, onLoadNearOffersData, onLoadCommentsData]);

  if (!onLoadOfferData || !onLoadNearOffersData || !onLoadCommentsData) {
    return (
      <LoadingScreen />
    );
  }

  return (<>
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"/>
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/>
        </symbol>
      </svg>
    </div>

    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, 6).map((image, index) => (
                <div key={`image-${index}`} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.is_premium ? <div className="property__mark"><span>Premium</span></div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button
                  className={`property__bookmark-button button ${offer.is_favorite && favoriteLabel ? `property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setFavoriteLabel(!favoriteLabel);
                    onUpdateFav(offer.id, favoriteLabel ? 0 : 1);
                  }}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${parseFloat(offer.rating) * 20}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good, index) => (
                    <li key={`good-${index}`} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper
                    ${offer.host.is_pro ? `property__avatar-wrapper--pro` : `` }`}
                  >
                    <img className="property__avatar user__avatar" src={offer.host.avatar_url} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.slice(0, 10).length}</span></h2>
                <ReviewList comments={comments} />
                { authorizationStatus === AuthorizationStatus.AUTH
                  ? <ReviewForm/>
                  : ``
                }
              </section>
            </div>
          </div>
        </section>


        <section className="property__map map">
          <Map points={nearOffers} activePoint={offer}/>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CardsList offers={nearOffers} getActiveCard={() => {}} updateFav={onUpdateFav} />
            </div>
          </section>
        </div>
      </main>
    </div>
  </>
  );
};

OfferPage.propTypes = {
  comments: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onLoadOffer: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired,
  onLoadOfferData: PropTypes.bool.isRequired,
  onLoadNearOffersData: PropTypes.bool.isRequired,
  onLoadNearOffers: PropTypes.func.isRequired,
  nearOffers: PropTypes.array.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onLoadCommentsData: PropTypes.string.isRequired,
  match: PropTypes.object,
  onUpdateFav: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  offer: getOffer(state),
  onLoadOfferData: getOnLoadOfferData(state),
  nearOffers: getNearOffers(state),
  onLoadNearOffersData: getOnLoadNearOffersData(state),
  comments: getComments(state),
  onLoadCommentsData: getOnLoadCommentsData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOffer(id) {
    dispatch(fetchOffer(id));
  },
  onLoadNearOffers(id) {
    dispatch(fetchNearOffers(id));
  },
  onLoadComments(id) {
    dispatch(fetchComments(id));
  },
  onUpdateFav(id, status) {
    dispatch(updateFav(id, status));
  },
});


export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
