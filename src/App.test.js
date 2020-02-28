import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  expect(getByText('WHERE TO LUNCH?')).toBeInTheDocument();
});

test('shows a lunch spot suggestion', () => {
  const { getByText } = render(<App />);
  fireEvent.click(screen.getByLabelText(/FIND ME A SPOT!/i))
});
