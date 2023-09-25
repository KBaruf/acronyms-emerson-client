import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
import Loading from './Loading';

export default function AddAcronym({ setAddNewAcronym }) {
  const [open, setOpen] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [addAcronym, setAddAcronym] = useState('');
  const [addName, setAddName] = useState('');
  const [addContext, setAddContext] = useState('');
  const [addDefinition, setAddDefinition] = useState('');

  // newly updated values
  const [acronym, setAcronym] = useState('');
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [definition, setDefinition] = useState('');
  const handleOpen = () => {
    setOpen(!open);
    setAddNewAcronym(false);
  };
  const addAcronymHandler = (e) => setAddAcronym(e.target.value.toUpperCase());
  const addNameHandler = (e) => setAddName(e.target.value);
  const addContextHandler = (e) => setAddContext(e.target.value);
  const addDefinitionHandler = (e) => setAddDefinition(e.target.value);

  // custom styles
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 4,
    pb: 0,
  };
  //text inputbox styles
  const textInputStyles = {
    width: '100%',
    height: '1.45rem',
    fontSize: '1.1rem',
    color: '#2C2C2B',
    border: success ? 'none' : '1.2px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    resize: 'none',
    fontFamily: 'Raleway, Arial',
  };

  const handleAddNewAcronym = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://acronymsatemerson.onrender.com/api/v1/acronym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acronym: addAcronym, name: addName, context: addContext, definition: addDefinition }),
      });
      setLoading(false);
      if (response.ok) {
        setSuccess(true);
        const results = await response.json();
        const { acronym, name, context, definition } = results.acronymnValues;
        setAcronym(acronym);
        setName(name);
        setContext(context);
        setDefinition(definition);

        setAddAcronym('');
        setAddName('');
        setAddContext('');
        setAddDefinition('');
      } else {
        setError(true);
        const res = await response.json();
        setErrorMessage(res.msg);
        if (res.err) {
          if (res.err.name === 'ValidationError') {
            const error = Object.values(res.err.errors).map((val) => val.message);
            setErrorMessage(error);
          }
        }
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Modal open={open} onClose={handleOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        {error && (
          <Alert sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }} severity='error'>
            {addAcronym?.length < 1 ? <p>Please add an Acronym before saving!</p> : errorMessage ? <p>{errorMessage}</p> : <p>There was an error adding ({addAcronym}). Please try again!</p>}
          </Alert>
        )}
        {success && <Alert severity='success'>{`Acronym (${acronym}) was added successfully`}</Alert>}
        {loading && <Loading />}
        <Typography variant='h5' component='div' sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center', pb: '10px', color: '##212121', textTransform: 'uppercase' }}>
          Add A New Acronym
        </Typography>
        <Card variant='outlined'>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-around' }}>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Acronym
              </Typography>
              <textarea style={textInputStyles} value={acronym ? acronym.toUpperCase() : addAcronym.toUpperCase()} onChange={addAcronymHandler} type='text' readOnly={success} />
            </CardContent>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Name
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize' }} value={name ? name : addName} onChange={addNameHandler} type='text' readOnly={success} />
            </CardContent>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Context
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize', height: 'auto' }} value={context ? context : addContext} onChange={addContextHandler} type='text' readOnly={success} />
            </CardContent>
            <CardContent sx={{ paddingTop: '0px', paddingBottom: '0' }}>
              <Typography sx={{ fontWeight: 'bold', mb: '2px', ml: 'auto' }} variant='h6'>
                Definition
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize', height: 'auto' }} value={definition ? definition : addDefinition} onChange={addDefinitionHandler} type='text' readOnly={success} />
            </CardContent>
          </CardContent>
        </Card>
        <div onClick={handleAddNewAcronym}>
          <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: '3rem' }}>
            <Button onClick={handleOpen} color='error' variant='contained' endIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button variant='contained' endIcon={<SaveIcon />}>
              Save
            </Button>
          </CardContent>
        </div>
      </Box>
    </Modal>
  );
}
