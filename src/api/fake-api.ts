export type Destination = {
    id: number;
    name: string;
    description: string;
    country: string;
    climate: string;
    currency: string;
    latitude: number;
    longitude: number;
};

// Simulated destination data search from mock JSON data
export const searchDestinations = async (query: string): Promise<Destination[]> => {
    console.log('searchDestinations called with query:', query);
    if (query.toLowerCase() === 'fail') {
        throw new Error('Search failed');
    }

    const destinations = await import('../_mocks_/destinations.json'); // Import mock data dynamically
    const result = destinations.default.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase())
    );
    return result;
};

// Helper function to calculate the distance between two geographical points using the Haversine formula
// Could be replaced with a library like `geolib` for more accurate results
// or google maps api for real-world applications
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// Function to fetch nearby destinations based on latitude and longitude
export const getNearbyPlaces = async (latitude: number, longitude: number): Promise<Destination[]> => {
    const destinations = await import('../_mocks_/destinations.json'); // Import mock data dynamically

    // Exclude the current destination and calculate the distance for each other destination
    const nearbyPlaces = destinations.default
        .filter(dest => dest.latitude !== latitude || dest.longitude !== longitude)
        .map(dest => ({
            ...dest,
            distance: calculateDistance(latitude, longitude, dest.latitude, dest.longitude),
        }))
        // Sort destinations by proximity (shortest distance first)
        .sort((a, b) => a.distance - b.distance)
        // Return top 5 closest destinations
        .slice(0, 5);

    return nearbyPlaces;
};

// Fetch details of a single destination
export const getDestinationDetails = async (id: number): Promise<Destination & { nearbyPlaces: Destination[] }> => {
    console.log('getDestinationDetails called with id:', id);

    const destinations = await import('../_mocks_/destinations.json'); // Import mock data dynamically
    const destination = destinations.default.find(dest => dest.id === id);

    if (!destination) {
        throw new Error('Destination not found');
    }

    // Get the top 5 nearby places
    const nearbyPlaces = await getNearbyPlaces(destination.latitude, destination.longitude);

    return { ...destination, nearbyPlaces };
};
