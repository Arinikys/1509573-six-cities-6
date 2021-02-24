import React from 'react';
import PropTypes from 'prop-types';
import Review from "./review";

const ReviewList = ({comments}) => {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))};
    </ul>
  );
};

ReviewList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ReviewList;
