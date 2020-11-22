import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/styles';

export const Tile = styled(({ children, className, ...props }) => (
  <img
    className={className}
    src={props.img}
    alt={props.id}
    onClick={() => window.open(props.pageURL, '_blank')}
  />
))(() => ({
  borderRadius: '8px',
  maxWidth: '100%',
  height: 'auto',
  '&:hover': {
    cursor: 'pointer',
  },
}));

Tile.propTypes = {
  id: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
