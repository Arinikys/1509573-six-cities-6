import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from "./mocks/offers";
import comments from "./mocks/comments";
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {checkAuth} from "./store/api-actions";
import {ActionCreator} from "./store/action";
import {redirect} from "./store/middleware/redirect";

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(false))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
        offers={offers}
        comments={comments}
      />,
    </Provider>,
    document.querySelector(`#root`)
);
