import React from 'react';
import PropTypes from 'prop-types';

const Review = ({comment}) => {
  return (
    <li key={`review-${comment.id}`} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatar_url} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${parseFloat(comment.rating) * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime="{comment.date}">{new Date(comment.date).toLocaleString(`en`, {day: `2-digit`, month: `long`})}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default React.memo(Review);
