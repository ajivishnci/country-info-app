import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import CountryInfo from './frontend/components/CountryInfo.js';

const App = () => {
  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);

  const fetchCountryInfo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/country/${country}`);
      const data = await response.json();
      setCountryInfo(data);
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Get Country Information
      </Typography>
      <TextField
        label="Enter Country"
        variant="outlined"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={fetchCountryInfo}>
        Get Country Info
      </Button>
      {countryInfo && <CountryInfo countryInfo={countryInfo} />}
    </Container>
  );
};

export default App;
