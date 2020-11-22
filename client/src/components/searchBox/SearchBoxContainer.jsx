import { styled } from '@material-ui/styles';

export const SearchBoxContainer = styled('div')(() => ({
  padding: '16px',
  backgroundColor: '#7B95BC',
  marginBottom: '48px',
  borderRadius: '8px',

  '& button': {
    height: '50px',
    width: '90%',
  }
}));
