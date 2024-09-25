import { MemoryRouter, } from 'react-router-dom';

import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import { getDestinationDetails } from './api/fake-api';

jest.mock('./api/fake-api', () => ({
  getDestinationDetails: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the app title', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const titleElement = screen.getByTestId('app-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Travel Destination Finder');
  });


  test('displays error message when fetching destination details fails', async () => {
    (getDestinationDetails as jest.Mock).mockRejectedValue(new Error('Failed to fetch destinations'));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('combobox');
    fireEvent.change(searchInput, { target: { value: 'Test Destination' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    const errorAlert = await screen.findByTestId('search-error');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent('Failed to fetch destinations');
  });
});