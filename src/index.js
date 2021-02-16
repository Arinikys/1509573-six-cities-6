import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from "./mocks/offers";
import comments from "./mocks/comments";

ReactDOM.render(
    <App
      offers={offers}
      comments={comments}
    />,
    document.querySelector(`#root`)
);
