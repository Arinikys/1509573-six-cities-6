import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {comments} from './comments';
import {ActionType} from '../action';
import {fetchComments, addComments} from '../api-actions';
import {APIRoute, loadStatus} from '../../const';

const api = createAPI(() => {});
const commentsList = [
  {
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 1,
    "rating": 4,
    "user": {
      "avatar_url": `img/1.png`,
      "id": 4,
      "is_pro": false,
      "name": `Max`
    }
  }
];

describe(`Reducer 'comments' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(comments(undefined, {}))
      .toEqual({
        comments: [],
        onLoadCommentsData: loadStatus.IDLE,
        onLoadCommentsFormData: loadStatus.IDLE,
        commentsFormError: ``
      });
  });

  it(`Reducer should update comments by load comments`, () => {
    const state = {comments: [], onLoadCommentsData: loadStatus.IDLE};
    const loadCommetsAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: commentsList
    };

    expect(comments(state, loadCommetsAction))
      .toEqual({comments: commentsList, onLoadCommentsData: loadStatus.SUCCESS});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /comments/1`, () => {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = fetchComments(id);

    apiMock
      .onGet(`${APIRoute.COMMENTS}/${id}`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments/1 with data`, () => {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeComment = {rating: `3`, comment: `test`};
    const commentsLoader = addComments(id, fakeComment);

    apiMock
      .onPost(`${APIRoute.COMMENTS}/${id}`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });
});

