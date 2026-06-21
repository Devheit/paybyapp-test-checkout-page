import { render, screen } from '@testing-library/react';
import App from './App';

test('renders store heading', () => {
  render(<App />);
  const heading = screen.getByText(/Discover Quality Products/i);
  expect(heading).toBeInTheDocument();
});
