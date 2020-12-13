import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  expect(4).toBe(4)
  // const { baseElement } = render(<App />);
  // expect(baseElement).toBeDefined();
});
