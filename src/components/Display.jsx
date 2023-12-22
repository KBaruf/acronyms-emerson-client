import { useState } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useFetch } from '../helpers/fetch';
import Alert from '@mui/material/Alert';
import Loading from './Loading';

export default function DisplayCard({ searchedValue }) {
  // fetch request
  const { data, error, loading } = useFetch(`https://acronymsatemerson.onrender.com/api/v1/acronym/${searchedValue}`);
  const results = data ? data?.results : '';
  const { acronym, name, context, definition, _id } = results || {};

  // state management
  const [success, setSuccess] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addAcronym, setAddAcronym] = useState(acronym);
  const [addName, setAddName] = useState(name);
  const [addContext, setAddContext] = useState(context);
  const [addDefinition, setAddDefinition] = useState(definition);

  //text inputbox styles
  const textInputStyles = {
    width: '100%',
    height: '1.45rem',
    fontSize: '1.1rem',
    color: '#2C2C2B',
    border: !edit ? 'none' : '1.2px solid #ccc',
    borderRadius: '5px',
    outline: !edit && 'none',
    resize: 'none',
    fontFamily: 'Raleway, Arial',
  };

  // control focus on input box
  const editHandler = () => setEdit(true);

  // capture text inputs
  const addAcronymHandler = (e) => setAddAcronym(e.target.value.toUpperCase());
  const addNameHandler = (e) => setAddName(e.target.value);
  const addContextHandler = (e) => setAddContext(e.target.value);
  const addDefinitionHandler = (e) => setAddDefinition(e.target.value);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`https://acronymsatemerson.onrender.com/api/v1/acronym/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acronym: addAcronym || acronym, name: addName || name, context: addContext || context, definition: addDefinition || definition }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setFetchError(true);
      }
    } catch (error) {
      setFetchError(true);
    }
  };
  //   const postResults = usePost(url);
  const btnAcronymHandler = () => {
    handleButtonClick();
    setEdit(!edit);
  };
  return (
    <Box sx={{ minWidth: 275, pt: '1rem', padding: '0', transform: edit ? 'scale(1.02)' : '', transition: edit ? 'transform 0.3s ease-in-out' : '' }}>
      {error ||
        (!results && (
          <Alert sx={{ display: 'flex', alignItems: 'center', height: '2rem' }} severity='error'>
            {<p>Searched Acronym ({<span style={{ fontWeight: 'bold', padding: '0 3px' }}>{searchedValue}</span>}) was not found</p>}
          </Alert>
        ))}
      {fetchError && (
        <Alert sx={{ display: 'flex', alignItems: 'center', height: '2rem' }} severity='error'>
          {<p>There was an error editing acronym details. Please try again</p>}
        </Alert>
      )}
      {success && <Alert severity='success'>{`Acronym (${acronym}) was updated Successfully`}</Alert>}

      <Typography variant='h5' component='div' sx={{ fontFamily: 'roboto', fontWeight: 'bold', flexGrow: 1, textAlign: 'center', pb: '10px' }}>
        Newly Searched Acronyms
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <Card variant='outlined'>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-around' }}>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Acronym
              </Typography>
              <textarea style={textInputStyles} value={addAcronym ? addAcronym.toUpperCase() : acronym?.toUpperCase() || 'N/A'} onChange={addAcronymHandler} type='text' readOnly={!edit} />
            </CardContent>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Name
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize' }} value={addName ? addName : name || 'N/A'} onChange={addNameHandler} type='text' readOnly={!edit} />
            </CardContent>
            <CardContent sx={{ paddingTop: '1px' }}>
              <Typography sx={{ fontWeight: 'bold' }} variant='h6'>
                Context
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize', height: 'auto' }} value={addContext ? addContext : context || 'N/A'} onChange={addContextHandler} type='text' readOnly={!edit} />
            </CardContent>
            <CardContent sx={{ paddingTop: '0px', paddingBottom: '0' }}>
              <Typography sx={{ fontWeight: 'bold', mb: '2px', ml: 'auto' }} variant='h6'>
                Definition
              </Typography>
              <textarea style={{ ...textInputStyles, textTransform: 'capitalize', minHeight: '50px', resize: 'vertical' }} value={addDefinition ? addDefinition : definition || 'N/A'} onChange={addDefinitionHandler} type='text' readOnly={!edit} />
            </CardContent>
          </CardContent>
        </Card>
      )}
      {!loading && (
        <div>
          {edit ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: '3rem', paddingBottom: '0' }}>
              <div onClick={() => setEdit(false)}>
                <Button color='error' variant='contained' endIcon={<CancelIcon />}>
                  Cancel
                </Button>
              </div>
              <Button onClick={btnAcronymHandler} variant='contained' endIcon={<SaveIcon />}>
                Save
              </Button>
            </CardContent>
          ) : (
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end', gap: '3rem' }}>
              {/* <Button color='error' variant='contained' endIcon={<DeleteIcon />}>
                Delete
              </Button> */}
              <Button onClick={editHandler} variant='contained' endIcon={<EditNoteIcon />}>
                Edit
              </Button>
            </CardContent>
          )}
        </div>
      )}
    </Box>
  );
}
