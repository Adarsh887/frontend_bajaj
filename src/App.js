/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/



import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate JSON
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON structure");
      }

      // Call the backend API
      const res = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert(`Invalid JSON or request error: ${error.message}`);
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const selectedData = selectedOptions.map(option => {
      return {
        label: option.label,
        value: response[option.value],
      };
    });

    return (
      <div>
        <h3>Response:</h3>
        <ul>
          {selectedData.map((item, index) => (
            <li key={index}>
              <strong>{item.label}:</strong> {JSON.stringify(item.value)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='text-success'>Bajaj Finserv health Challenge</h1>
      <br/>
      <textarea
        className='form-control w-50'
        placeholder='Enter API input here...'
        value={jsonInput}
        onChange={handleJsonChange}
        rows='10'
        cols='50'
      />
      <br />
      <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>

      {response && (
        <div>
          <h2>Select Data to Display</h2>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;


/*import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ['Alphabets', 'Numbers', 'Highest lowercase alphabet'];

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const validateJson = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJson(jsonInput)) {
      setError('Invalid JSON format');
      return;
    }

    setError('');
    try {
      const result = await axios.post('http://localhost:3000/bfhl', JSON.parse(jsonInput));
      setResponse(result.data);
    } catch (err) {
      setError('Error processing the request');
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        JSON Processor
      </Typography>
      <TextField
        label="JSON Input"
        fullWidth
        multiline
        minRows={4}
        variant="outlined"
        value={jsonInput}
        onChange={handleInputChange}
        error={!!error}
        helperText={error}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      {response && (
        <Box mt={4}>
          <FormControl fullWidth>
            <InputLabel>Select Data to Display</InputLabel>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleDropdownChange}
              input={<OutlinedInput label="Select Data to Display" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={4}>
            {selectedOptions.includes('Alphabets') && (
              <Typography variant="body1">Alphabets: {response.alphabets.join(', ')}</Typography>
            )}
            {selectedOptions.includes('Numbers') && (
              <Typography variant="body1">Numbers: {response.numbers.join(', ')}</Typography>
            )}
            {selectedOptions.includes('Highest lowercase alphabet') && (
              <Typography variant="body1">
                Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default App;*/
