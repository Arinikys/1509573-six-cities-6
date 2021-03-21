import {combineReducers} from 'redux';
import {offers} from "./offers/offers";
import {comments} from "./comments/comments";
import {offer} from "./offer/offer";
import {favorites} from "./favorites/favorites";
import {user} from './user/user';

export const NameSpace = {
  USER: `USER`,
  OFFER: `OFFER`,
  OFFERS: `OFFERS`,
  FAVORITES: `FAVORITES`,
  COMMENTS: `COMMENTS`
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.OFFER]: offer,
  [NameSpace.OFFERS]: offers,
  [NameSpace.COMMENTS]: comments,
  [NameSpace.FAVORITES]: favorites,
});
