export const formatDistance = (distance: number): string => {
    return distance ? `${distance.toFixed(2)} km` : 'N/A';
};