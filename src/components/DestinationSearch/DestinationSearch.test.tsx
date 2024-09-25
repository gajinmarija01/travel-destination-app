import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { searchDestinations } from '../../api/fake-api';

import { DestinationSearch } from './DestinationSearch';

jest.mock('../../api/fake-api', () => ({
    searchDestinations: jest.fn(),
}));

const mockDestinations = [
    { id: 1, name: 'Paris' },
    { id: 2, name: 'New York' },
];

describe('DestinationSearch', () => {
    it('renders the search component', () => {
        render(<DestinationSearch onSelectDestination={jest.fn()} />);
        expect(screen.getByTestId('search-component')).toBeInTheDocument();
    });

    it('displays search results', async () => {
        (searchDestinations as jest.Mock).mockResolvedValueOnce(mockDestinations);
        render(<DestinationSearch onSelectDestination={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/search for a destination/i), { target: { value: 'Pa' } });

        await waitFor(() => {
            expect(screen.getByText('Paris')).toBeInTheDocument();
            expect(screen.getByText('New York')).toBeInTheDocument();
        });
    });

    it('displays an error message when search fails', async () => {
        (searchDestinations as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch destinations'));
        render(<DestinationSearch onSelectDestination={jest.fn()} />);

        fireEvent.change(screen.getByLabelText(/search for a destination/i), { target: { value: 'Pa' } });

        await waitFor(() => {
            expect(screen.getByTestId('search-error')).toBeInTheDocument();
            expect(screen.getByText('Failed to fetch destinations')).toBeInTheDocument();
        });
    });
});