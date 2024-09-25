import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Importing from react-router-dom
import { DestinationSearch } from './components/DestinationSearch/DestinationSearch';
import { getDestinationDetails, Destination } from './api/fake-api';
import { DestinationDetails } from './components/DestinationDetails/DestinationDetails';

const App: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination & { nearbyPlaces: any[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('destinationId');
  };

  const handleSelectDestination = async (destinationId: number | null) => {
    if (destinationId === null) {
      // If no destination is selected (input cleared), reset state and URL
      setSelectedDestination(null);
      setError(null); // Clear any previous error when combobox is cleared
      navigate('/');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate a delay (e.g., 2 seconds) to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const details = await getDestinationDetails(destinationId);
      setSelectedDestination(details);

      // Update the URL to reflect the selected destination
      navigate(`/?destinationId=${destinationId}`, { replace: true });
    } catch (err) {
      setSelectedDestination(null); // Clear any previously selected destination on error
      setError('Failed to load destination details');
    } finally {
      setLoading(false);
    }
  };

  // When the app loads, read the destinationId from the URL and fetch the details
  useEffect(() => {
    const destinationId = getQueryParams();
    if (destinationId) {
      handleSelectDestination(parseInt(destinationId, 10)); // Fetch the destination if the destinationId is present in the URL
    }
  }, [location.search]); // Re-run when the URL changes

  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom data-testid="app-title">
          Travel Destination Finder
        </Typography>
        <DestinationSearch onSelectDestination={(destination) => handleSelectDestination(destination ? destination.id : null)} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={2} data-testid="loading-spinner">
          <CircularProgress />
        </Box>
      )}

      {error ? (
        <Box my={2}>
          <Alert severity="error" data-testid="error-alert">{error}</Alert>
        </Box>
      ) : (
        selectedDestination && (
          <Box mt={4}>
            <DestinationDetails
              destination={selectedDestination}
              onSelectNearbyDestination={handleSelectDestination}
            />
          </Box>
        )
      )}
    </Container>
  );
};

export default App;
