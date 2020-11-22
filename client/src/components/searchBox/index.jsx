import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Button, Grid, TextField } from '@material-ui/core';

const SearchBoxContainer = styled('div')(() => ({
  padding: '6px 16px 16px',
  backgroundColor: '#A9C4EA',
  marginBottom: '48px',
  borderRadius: '8px',
  '& button': {
    height: '50px',
    width: '90%',
    marginTop: '10px',
  },
  '& div.MuiTextField-root': {
    marginTop: '10px',
  },
}));

export const SearchBox = props => {
  const { fetchImages } = props;
  const [textFieldText, setTextFieldText] = useState("");

  const onChange = (event) => {
    setTextFieldText(event.target.value)
  }

  return (
    <SearchBoxContainer>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={8} md={10}>
          <TextField
            id="search-box"
            label="Search images and gifs"
            variant="outlined"
            fullWidth
            value={textFieldText}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchImages(textFieldText)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </SearchBoxContainer>
  );
};

SearchBox.propTypes = {
  fetchImages: PropTypes.func.isRequired,
};
