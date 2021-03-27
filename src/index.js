import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {Provider} from 'react-redux';
import rootReducer from './store/root-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {checkAuth} from "./store/api-actions";
import {ActionCreator} from "./store/action";
import {redirect} from "./store/middleware/redirect";
import {AuthorizationStatus} from "./const";
import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from "./browser-history";

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);
(async () => {
  await store.dispatch(checkAuth());
  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter history={browserHistory}>
          <App/>,
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
})();

