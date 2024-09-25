import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, Box, Autocomplete } from '@mui/material';
import { searchDestinations, Destination } from '../../api/fake-api';
import { debounce } from '../../utils/debounce';

type Props = {
    onSelectDestination: (destination: Destination | null) => void;
};

export const DestinationSearch: React.FC<Props> = ({ onSelectDestination }) => {

    const inputRef = React.useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Destination[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Debounced search function
    const handleSearch = debounce(async (query: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await searchDestinations(query);
            setResults(data);
        } catch (err) {
            setError('Failed to fetch destinations');
        } finally {
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        if (query) {
            if (error) {
                onSelectDestination(null)
            }
            handleSearch(query);
        } else {
            setResults([]);
            onSelectDestination(null);
        }
    }, [query, handleSearch, onSelectDestination]);

    return (
        <Box data-testid="search-component">
            <Autocomplete
                fullWidth
                options={results}
                loading={loading}
                getOptionLabel={(option: Destination) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="No destinations found"
                loadingText="Searching..."
                onChange={(event, value) => {
                    if (value) {
                        onSelectDestination(value);
                        inputRef.current?.focus();  // Refocus the input after selection if needed
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for a destination"
                        variant="outlined"
                        onChange={(e) => setQuery(e.target.value)}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />

            {error && (
                <Box color="error.main" data-testid="search-error">
                    {error}
                </Box>
            )}
        </Box>
    );
};
