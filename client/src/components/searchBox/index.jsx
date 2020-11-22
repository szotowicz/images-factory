import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@material-ui/core';
import { SearchBoxContainer } from './SearchBoxContainer';

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
