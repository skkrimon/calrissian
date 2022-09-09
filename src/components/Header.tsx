import { AppBar, Icon, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Lando } from '../lib/lando';

interface HeaderProps {
  handleRefresh: () => void;
}

function Header(props: HeaderProps) {
  const onPoweroff = () => {
    Lando.poweroff();
  };

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
          <Tooltip title='Poweroff'>
            <IconButton onClick={onPoweroff} aria-label='autorenew' size='large'>
              <Icon>power_settings_new</Icon>
            </IconButton>
          </Tooltip>
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
