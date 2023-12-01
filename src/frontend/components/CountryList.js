import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CountryList = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item.primary} secondary={item.secondary} />
        </ListItem>
      ))}
    </List>
  );
};

export default CountryList;
