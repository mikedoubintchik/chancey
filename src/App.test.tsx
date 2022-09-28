import { render } from '@testing-library/react';
import App from './App';

it.skip('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
