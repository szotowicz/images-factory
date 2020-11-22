import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Tile } from './Tile';

export const ImageTile = props => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Tile {...props} />
    </Grid>
  );
};

ImageTile.propTypes = {
  id: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
