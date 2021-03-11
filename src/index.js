import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from "./mocks/offers";
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {checkAuth} from "./store/api-actions";
import {ActionCreator} from "./store/action";
import {redirect} from "./store/middleware/redirect";
import {AuthorizationStatus} from "./const";

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);
(async () => {
  await store.dispatch(checkAuth());
  ReactDOM.render(
      <Provider store={store}>
        <App
          offers={offers}
        />,
      </Provider>,
      document.querySelector(`#root`)
  );
})();

