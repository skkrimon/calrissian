import { AppBar, Icon, IconButton, Toolbar, Tooltip } from '@mui/material';
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
          <Tooltip title='Refresh'>
            <IconButton onClick={props.handleRefresh} aria-label='autorenew' size='large'>
              <Icon>autorenew</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title='Settings'>
            <IconButton aria-label='settings' size='large'>
              <Icon>settings</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
