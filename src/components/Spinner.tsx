import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

function Spinner(): JSX.Element {
  return (
    <div className='backdrop'>
      <div className='spinner'>
        <CircularProgress size='5rem' />
      </div>
    </div>
  );
}

export default Spinner;
