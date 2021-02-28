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

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);
ReactDOM.render(
    <Provider store={store}>
      <App
        offers={offers}
        comments={comments}
      />,
    </Provider>,
    document.querySelector(`#root`)
);
