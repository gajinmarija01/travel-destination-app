import React from 'react';
import { Destination } from '../../api/fake-api';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { formatDistance } from '../../utils/formatDistance';

type Props = {
    destination: Destination & { nearbyPlaces: any[] };
    onSelectNearbyDestination: (destinationId: number) => void;  // New prop to handle click on nearby places
};

export const DestinationDetails: React.FC<Props> = ({ destination, onSelectNearbyDestination }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2 }} data-testid="destination-details">
            {/* Selected destination */}
            <Typography variant="h5" gutterBottom data-testid="destination-name">
                {destination.name}
            </Typography>
            <Typography variant="body1" paragraph data-testid="destination-description">
                {destination.description}
            </Typography>

            {/* Nearby places */}
            <Box mt={4}>
                <Typography variant="h6" data-testid="nearby-places-title">Top 5 Nearby Places:</Typography>
                <TableContainer component={Paper} data-testid="details-table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Distance</TableCell>
                                <TableCell>Action</TableCell> {/* New column for clicking on nearby places */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {destination.nearbyPlaces.map((place) => (
                                <TableRow key={place.id}>
                                    <TableCell>{place.name}</TableCell>
                                    <TableCell>{place.description || 'N/A'}</TableCell>
                                    <TableCell>{formatDistance(place.distance) || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onSelectNearbyDestination(place.id)}  // Call the handler when clicked
                                            data-testid={`select-nearby-${place.id}`}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
};
