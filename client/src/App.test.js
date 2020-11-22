import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Images Factory header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Images Factory/i);
  expect(linkElement).toBeInTheDocument();
});
