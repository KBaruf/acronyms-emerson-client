import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Search = ({ getValue }) => {
  const [seachedValue, setSeachedValue] = useState('');
  const searchHandler = (e) => {
    setSeachedValue(e.target.value);
  };

  return (
    <Box sx={{ mx: 'auto', mt: '6rem', mb: '2rem', textAlign: 'center' }}>
      <TextField value={seachedValue} onChange={searchHandler} id='search' label='search acronym' variant='outlined' fullWidth />
      <Button
        onClick={() => {
          getValue(seachedValue);
          setSeachedValue('');
        }}
        sx={{ my: '1rem' }}
        variant='contained'
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
      <div style={{ width: '100%', margin: '2rem auto' }}>
        <hr />
      </div>
    </Box>
  );
};

export default Search;
