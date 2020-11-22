import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const ShowMoreContainer = styled('div')(() => ({
  margin: '32px 0 16px',
  '& > button': {
    width: '50%',
  }
}));

export const ShowMoreButton = props => {
  const { showMore } = props;

  return (
    <ShowMoreContainer>
      <Button variant="outlined" onClick={showMore}>Show More</Button>
    </ShowMoreContainer>
  );
};

ShowMoreButton.propTypes = {
  showMore: PropTypes.func.isRequired,
};
