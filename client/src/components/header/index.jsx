import React from 'react';
import { styled } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const HeaderContainer = styled('div')(() => ({
  padding: '64px 0',
  backgroundColor: '#5375BB',
  color: '#000165',
  textShadow: `2px 2px 3px #CCCCCC90`,
}));

export const Header = props => {
  const { title } = props;

  return (
    <HeaderContainer>
      <Typography align="center" variant="h1">
        {title}
      </Typography>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
