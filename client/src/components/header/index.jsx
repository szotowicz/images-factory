import React from 'react';
import { styled } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const HeaderContainer = styled('div')(() => ({
  padding: '64px 0',
  backgroundColor: '#2C529E',
  color: '#6C008C',
}));

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
