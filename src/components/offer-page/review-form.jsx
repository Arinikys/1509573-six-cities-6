import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";

const ReviewForm = ({onCommentSubmit, isFormDisable, errorMessage}) => {

  const formRef = useRef();
  const commentRef = useRef();
  const ratingRef = useRef();

  useEffect(() => {
    if (errorMessage === ``) {
      commentRef.current.value = ``;
      ratingRef.current.checked = false;
    }
  }, [isFormDisable]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(formRef.current);
    let formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    onCommentSubmit(formDataObj);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit} ref={formRef}>
      <fieldset style={{border: `none`}} disabled={isFormDisable}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Array.apply(0, Array(5)).map((item, starIndex) => (
            <>
              <input
                ref={ratingRef}
                className="form__rating-input visually-hidden"
                name="rating"
                value={starIndex + 1}
                id={`${starIndex + 1}-stars`}
                type="radio"
                required />
              <label
                htmlFor={`${starIndex + 1}-stars`}
                className="reviews__rating-label form__rating-label"
                title="perfect"
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </>
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="comment2"
          minLength="50"
          maxLength="300"
          required
          ref={commentRef}
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
        { errorMessage !== ``
          ? <div className="reviews__button-wrapper">
            <p className="reviews__help" style={{color: `red`}}>
              {errorMessage}
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
  onCommentSubmit: PropTypes.func.isRequired,
  isFormDisable: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default ReviewForm;
