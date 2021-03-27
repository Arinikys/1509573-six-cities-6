import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import LoadingScreen from "./loading-screen";
import '@testing-library/jest-dom';

it(`LoadingScreen should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <LoadingScreen />
      </Router>
  );
  const textElement = getByText(`Loading ...`);

  expect(textElement).toBeInTheDocument();
});
