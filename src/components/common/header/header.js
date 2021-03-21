import React from 'react';
import PropTypes from 'prop-types';
import {AppRoute, AuthorizationStatus} from "../../../const";
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {getUser, getAuthorizationStatus} from "../../../store/user/selectors";

const Header = ({authorizationStatus, user}) => {
  const history = useHistory();
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a
              className="header__logo-link"
              onClick={() => history.push(AppRoute.ROOT)}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                { authorizationStatus === AuthorizationStatus.AUTH
                  ? <a className="header__nav-link header__nav-link--profile"
                    onClick={() => history.push(AppRoute.FAVORITES)}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user.email}</span>
                  </a>
                  : <a
                    className="header__nav-link header__nav-link--profile"
                    onClick={() => history.push(AppRoute.LOGIN)}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state)
});

export {Header};
export default connect(mapStateToProps, null)(Header);
