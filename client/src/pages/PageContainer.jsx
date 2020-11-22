import { styled } from '@material-ui/styles';

export const PageContainer = styled(({ children, className }) => (
  <div className={className}>
    <div>{children}</div>
  </div>
))(() => ({
  width: '100%',
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#778DAE',
  '& > div': {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
  },
}));
