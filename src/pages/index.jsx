import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import { useState } from 'react';
import DisplayCard from '../components/Display';

const HomePage = () => {
  const [addNewAcronym, setAddNewAcronym] = useState(false);
  const [searchedValue, setSeachedValue] = useState('sdla');
  const getValue = (value) => setSeachedValue(value);
  const newAcronym = (bool) => {
    setAddNewAcronym(bool);
  };

  return (
    <Container>
      <Navbar newAcronym={newAcronym} addNewAcronym={addNewAcronym} />
      <Search getValue={getValue} />
      <DisplayCard searchedValue={searchedValue} addNewAcronym={addNewAcronym} />
    </Container>
  );
};

export default HomePage;
