import { render, screen, fireEvent } from '@testing-library/react';

import destination from '../../_mocks_/destinations.json';

import { DestinationDetails } from './DestinationDetails';

const mockDestination = {
    ...destination[0],
    nearbyPlaces: destination.slice(0, 5),
};

const mockOnSelectNearbyDestination = jest.fn();

describe('DestinationDetails', () => {
    beforeEach(() => {
        render(<DestinationDetails destination={mockDestination} onSelectNearbyDestination={mockOnSelectNearbyDestination} />);
    });

    test('renders destination name and description', () => {
        expect(screen.getByTestId('destination-name')).toHaveTextContent('Paris, France');
        expect(screen.getByTestId('destination-description')).toHaveTextContent('The City of Light, known for its iconic Eiffel Tower and world-class cuisine.');
    });

    test('renders nearby places table with correct data', () => {
        expect(screen.getByTestId('nearby-places-title')).toHaveTextContent('Top 5 Nearby Places:');
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6); // 1 header row + 5 data rows
    });

    test('calls onSelectNearbyDestination when a nearby place button is clicked', () => {
        const button = screen.getByTestId('select-nearby-2');
        fireEvent.click(button);
        expect(mockOnSelectNearbyDestination).toHaveBeenCalledWith(2);
    });
});