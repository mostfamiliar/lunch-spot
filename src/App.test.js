import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import nock from 'nock';
import App from './App';

it('renders page', () => {
  const { getByText } = render(<App />);
  expect(getByText('WHERE TO LUNCH?')).toBeInTheDocument();
});

it('displays lunch spot', () => {
  const scope = nock('http://localhost:8888') 
  .get('/suggestions')
  .reply(200, { products: 
    [{
      "id": "1",
      "name": "Shalom Y'all",
      "description": "Delicious Israeli food",
      "address": "117 SE Taylor #101, Portland, OR 97214",
      "link": "https://www.shalomyallpdx.com/",
      "votes": 3
    }] 
  }, 
  { 
    'Access-Control-Allow-Origin': '*', 
    'Content-type': 'application/json' 
  }); 
  const { debug, findByText } = render(<App />);
  expect(findByText('Delicious Israeli food')).toBeInTheDocument();
})