import {ActionType} from '../action';
import {loadStatus} from '../../const';

const initialState = {
  comments: [],
  onLoadCommentsData: loadStatus.IDLE,
  onLoadCommentsFormData: loadStatus.IDLE,
  commentsFormError: ``,
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        onLoadCommentsData: loadStatus.SUCCESS,
      };
    case ActionType.ADD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        commentsFormError: ``,
        onLoadCommentsFormData: loadStatus.SUCCESS
      };
    case ActionType.ADD_COMMENTS_FETCHING:
      return {
        ...state,
        onLoadCommentsFormData: loadStatus.FETCHING
      };
    case ActionType.ADD_COMMENTS_FAIL:
      return {
        ...state,
        commentsFormError: action.payload,
        onLoadCommentsFormData: loadStatus.ERROR
      };
  }

  return state;
};

export {comments};
