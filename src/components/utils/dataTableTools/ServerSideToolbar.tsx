import React, { ChangeEvent, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../../inputs/textField';
import IconifyIcon from '../../icon/IconifyIcon';

interface Props {
  value: string;
  clearSearch: () => void;
  onChange: (e: ChangeEvent) => void; // Update the prop to handle search
}

const ServerSideToolbar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>(props.value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced function to trigger the API call
  const debouncedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);

    // Clear previous timeout if any
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout with 500ms delay
    timeoutRef.current = setTimeout(() => {
      // Trigger the API call with the debounced value
      props.onChange(e);
    }, 1000); // Adjust timeout delay as needed
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    props.clearSearch();
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
      }}
    >
      <Link to="/blog-create">
        <Button
          variant="contained"
          sx={{ marginRight: '16px', fontSize: '14px', py: 1, color: '#fff' }}
          color="primary"
        >
          Create Blog
        </Button>
      </Link>

      <CustomTextField
        value={searchQuery}
        placeholder="Search…"
        onChange={debouncedOnChange}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <IconifyIcon fontSize="1.25rem" icon="tabler:search" />
            </Box>
          ),
          endAdornment: (
            <IconButton size="small" title="Clear" aria-label="Clear" onClick={handleClearSearch}>
              <IconifyIcon fontSize="1.25rem" icon="tabler:x" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          '& .MuiInputBase-root > svg': {
            mr: 2,
          },
        }}
      />
    </Box>
  );
};

export default ServerSideToolbar;
