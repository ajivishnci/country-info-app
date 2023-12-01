import React from 'react';
import { Paper, Typography } from '@mui/material';
import CountryList from './CountryList.js';

const CountryInfo = ({ countryInfo }) => {
  // Check if countryInfo is defined and is an array
    if (!Array.isArray(countryInfo) || countryInfo.length === 0) {
        return null;
    }
    let firstCountry;
    // Assuming you want to render information for the first country in the array
    if (countryInfo.length > 1) {
        firstCountry = countryInfo[1];
    } else {
        firstCountry = countryInfo[0];
    }

  try {
    const {
      name,
      capital,
      region,
      subregion,
      population,
      currencies,
      languages,
      flags,
    } = firstCountry;

    function extractAnyCurrencyInfo(currencies) {
      try {
        const currencyCode = Object.keys(currencies)[0];
        const currencyInfo = currencies[currencyCode];

        // Check if the currency information is complete
        if (!currencyInfo || !currencyInfo.name || !currencyInfo.symbol) {
          throw new Error("Currency data is incomplete.");
        }

        // Return the extracted currency information
        return { code: currencyCode, name: currencyInfo.name, symbol: currencyInfo.symbol };
      } catch (error) {
        console.error('Error extracting currency information:', error.message);
        return { code: 'N/A', name: 'N/A', symbol: 'N/A' };
      }
    }

    function formatPopulation(population) {
        if (population >= 1e9) {
          return `${(population / 1e9).toFixed(2)} billion`;
        } else if (population >= 1e6) {
          return `${(population / 1e6).toFixed(2)} million`;
        } else {
          return population.toLocaleString();
        }
    }      

    const listItems = [
      { primary: `Capital: ${capital[0]}` },
      { primary: `Region: ${region}`, secondary: `Subregion: ${subregion}` },
      { primary: `Population: ${formatPopulation(population)}` },
      { primary: `Currency: ${extractAnyCurrencyInfo(currencies).name} (${extractAnyCurrencyInfo(currencies).symbol})` },
      { primary: `Language: ${languages?.eng || 'N/A'}` },
      { primary: 'Flag:', secondary: <img src={flags.png} alt="Country Flag" style={{ width: '100px', height: 'auto' }} /> },
    ];

    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h5">{name.common}</Typography>
        <CountryList items={listItems} />
      </Paper>
    );
  } catch (error) {
    // Handle errors gracefully
    console.error('Error rendering CountryInfo:', error);
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h5">Error</Typography>
        <Typography color="error">{error.message}</Typography>
      </Paper>
    );
  }
};

export default CountryInfo;
