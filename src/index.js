import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const cards = [0, 1, 2, 3, 4];

ReactDOM.render(
    <App
      cards={cards}
    />,
    document.querySelector(`#root`)
);
