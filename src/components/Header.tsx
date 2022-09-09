import { AppBar, Icon, IconButton, Toolbar } from '@mui/material';
import Spinner from './Spinner';

interface HeaderProps {
  handleRefresh: () => void;
}

function Header(props: HeaderProps) {
  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
          }}
        >
          <IconButton onClick={props.handleRefresh} aria-label='autorenew' size='large'>
            <Icon>autorenew</Icon>
          </IconButton>
          <IconButton aria-label='settings' size='large'>
            <Icon>settings</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
