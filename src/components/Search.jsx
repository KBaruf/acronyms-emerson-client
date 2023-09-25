import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const Search = ({ getValue }) => {
  const [searchedValue, setSeachedValue] = useState('');
  const [searchEmpty, setSearchEmpty] = useState(false);
  const searchHandler = (e) => {
    setSeachedValue(e.target.value);
  };

  return (
    <Box sx={{ mx: 'auto', mt: '6rem', mb: '2rem', textAlign: 'center' }}>
      <TextField value={searchedValue} onChange={searchHandler} id='search' label='search acronym' variant='outlined' fullWidth />
      <Button
        onClick={() => {
          if (!searchedValue) {
            setSearchEmpty(true);
            return;
          }
          getValue(searchedValue);
          setSeachedValue('');
        }}
        sx={{ my: '1rem' }}
        variant='contained'
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
      {searchEmpty && (
        <Alert sx={{ display: 'flex', alignItems: 'center', height: '2rem' }} severity='error'>
          {<p>Please enter an Acronym before searching</p>}
        </Alert>
      )}
      <div style={{ width: '100%', margin: '2rem auto' }}>
        <hr />
      </div>
    </Box>
  );
};

export default Search;
