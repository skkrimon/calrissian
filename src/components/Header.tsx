import { AppBar, Icon, IconButton, TextField, Toolbar, Tooltip } from '@mui/material';
import Settings from './Settings';

interface HeaderProps {
  handleRefresh: () => void;
  handlePoweroff: () => void;
  handleSearch: (value: string) => void;
}

function Header(props: HeaderProps) {
  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id='search'
            label='Search'
            type='search'
            onChange={(e) => props.handleSearch(e.target.value)}
            size='small'
          />
          <div>
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
            <Tooltip title='Save'>
              <IconButton disabled aria-label='save' size='large'>
                <Icon>save</Icon>
              </IconButton>
            </Tooltip>
            <Settings />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
