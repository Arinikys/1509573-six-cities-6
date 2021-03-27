import React, {useEffect, useRef} from 'react';
import Star from "./star";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addComments} from "../../store/api-actions";
import {loadStatus} from "../../const";
import {ActionCreator} from "../../store/action";
import {getCommentsFormError, getOnLoadCommentsFormData} from "../../store/comments/selectors";
import {getOffer} from "../../store/offer/selectors";

const ReviewForm = ({onAddComments, commentsFormError, offer, onLoadCommentsFormData}) => {

  const formRef = useRef();
  const starArr = Array.apply(1, Array(5));

  useEffect(() => {
    if (onLoadCommentsFormData === loadStatus.SUCCESS) {
      formRef.current.reset();
    }
  }, [onLoadCommentsFormData]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(formRef.current);
    let formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    onAddComments(offer.id, formDataObj);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit} ref={formRef}>
      <fieldset style={{border: `none`}} disabled={onLoadCommentsFormData === loadStatus.FETCHING}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {starArr.map((item, index) => (
            <Star key={index} index={starArr.length - index} />
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="comment"
          minLength="50"
          maxLength="300"
          required
          data-testid="comment"
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
        { commentsFormError !== ``
          ? <div className="reviews__button-wrapper">
            <p className="reviews__help" style={{color: `red`}}>
              {commentsFormError}
            </p>
          </div>
          : ``
        }
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </fieldset>
    </form>
  );
};

ReviewForm.propTypes = {
  onAddComments: PropTypes.func.isRequired,
  commentsFormError: PropTypes.string.isRequired,
  offer: PropTypes.object.isRequired,
  onLoadCommentsFormData: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  commentsFormError: getCommentsFormError(state),
  offer: getOffer(state),
  onLoadCommentsFormData: getOnLoadCommentsFormData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddComments(id, {rating, comment}) {
    dispatch(ActionCreator.addCommentsFetching());
    dispatch(addComments(id, {rating, comment}));
  },
});


export {ReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
