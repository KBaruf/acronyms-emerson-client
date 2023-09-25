import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import AddAcronym from './AddAcronym';
import { useState } from 'react';

export default function Navbar() {
  const [addNewAcronym, setAddNewAcronym] = useState(false);
  const handlerAddClick = () => setAddNewAcronym(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <div onClick={() => window.location.reload()}>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuBookIcon fontSize='large' />
            </IconButton>
          </div>
          <Typography
            variant='h6'
            component='div'
            sx={{
              fontWeight: 'bold',
              flexGrow: 1,
              '@media (max-width: 600px)': {
                fontSize: '1rem',
              },
              '@media (max-width: 400px)': {
                fontSize: '0.9rem',
              },
            }}
          >
            Acronyms@Emerson
          </Typography>
          <div onClick={handlerAddClick}>
            <Button
              color='inherit'
              sx={{
                marginRight: '6rem',
                '@media (max-width: 600px)': {
                  marginRight: '0rem',
                },
                '@media (max-width: 400px)': {
                  fontSize: '0.8rem',
                },
              }}
            >
              <AddIcon sx={{ color: '#00c853' }} />
              Add Acronym
            </Button>
          </div>
          {/* <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
      {addNewAcronym && <AddAcronym setAddNewAcronym={setAddNewAcronym} />}
    </Box>
  );
}
