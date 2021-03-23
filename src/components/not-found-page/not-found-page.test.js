import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';
import '@testing-library/jest-dom';

it(`NotFoundPage should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
  );
  const headerElement = getByText(`404. Page not found`);

  expect(headerElement).toBeInTheDocument();
});
