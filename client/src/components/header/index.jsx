import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { HeaderContainer } from './HeaderContainer';

export const Header = props => {
  const { title } = props;

  return (
    <HeaderContainer>
      <Typography align="center" variant="h2">
        {title}
      </Typography>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
