import React from 'react';
import { render, screen } from '@testing-library/react';
import Timer from './routes/timer/modules';

test('renders timer', () => {
  render(<Timer timerName="test" />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
