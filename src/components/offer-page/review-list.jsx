import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Review from "./review";

const ReviewList = ({comments}) => {
  const sortComments = [...comments].sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <ul className="reviews__list">
      {sortComments.slice(0, 10).map((comment) => (
        <Review key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

ReviewList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default ReviewList;
