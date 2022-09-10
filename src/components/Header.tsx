import { AppBar, Icon, IconButton, Toolbar, Tooltip } from '@mui/material';

interface HeaderProps {
  handleRefresh: () => void;
  handlePoweroff: () => void;
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
          <Tooltip title='Poweroff'>
            <IconButton onClick={props.handlePoweroff} aria-label='autorenew' size='large'>
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
