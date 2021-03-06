import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CardsList from "../common/card-list/cards-list";
import Map from "../common/map/map";
import LoadingScreen from "../loading-screen/loading-screen";
import CitiesList from "../common/cities-list/cities-list";
import Sort from "./sort";
import MainEmpty from "./main-empty";
import Header from "../common/header/header";
import {ActionCreator} from "../../store/action";
import {fetchOffersList, updateFav} from "../../store/api-actions";
import {getUser, getAuthorizationStatus} from "../../store/user/selectors";
import {getOffers, getCity, getIsDataLoaded} from "../../store/offers/selectors";

const MainPage = (props) => {
  const {offers, onCitySelect, city, isDataLoaded, onLoadData, onSortTypeSelect, onUpdateFav} = props;
  const [activeCardId, setactiveCardId] = useState(null);

  useEffect(() => {
    if (isDataLoaded) {
      onCitySelect(city);
    } else {
      onLoadData();
    }
  }, [isDataLoaded]);

  const onCardMouseOver = (id) => {
    setactiveCardId(id);
  };

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const onFavoriteButtonClick = (id, status) => {
    onUpdateFav(id, status);
  };

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
    <div className={`page page--gray page--main ${ offers.length <= 0 ? `page__main--index-empty` : ``}`}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList getActiveCity={onCitySelect} activeCity={city} />
          </section>
        </div>
        <div className="cities">
          { offers.length > 0
            ? <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <Sort onSortTypeChange={onSortTypeSelect}/>
                <div className="cities__places-list places__list tabs__content">
                  <CardsList offers={offers} getActiveCard={onCardMouseOver} updateFav={onFavoriteButtonClick}/>
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map points={offers} activeCardId={activeCardId}/>
                </section>
              </div>
            </div>
            : <MainEmpty/>
          }
        </div>
      </main>
    </div>
  </>
  );
};

MainPage.propTypes = {
  offers: PropTypes.array.isRequired,
  onCitySelect: PropTypes.func.isRequired,
  onSortTypeSelect: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.object,
  onUpdateFav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  city: getCity(state),
  isDataLoaded: getIsDataLoaded(state),
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCitySelect(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.filteredOffers());
  },
  onSortTypeSelect(type) {
    dispatch(ActionCreator.sortOffers(type));
  },
  onLoadData() {
    dispatch(fetchOffersList());
  },
  onUpdateFav(id, status) {
    dispatch(updateFav(id, status));
  },
});


export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
