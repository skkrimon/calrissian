import { AppBar, Icon, IconButton, Toolbar } from '@mui/material';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton aria-label='settings' size='large'>
                    <Icon>settings</Icon>
                </IconButton>
                <IconButton aria-label='autorenew' size='large'>
                    <Icon>autorenew</Icon>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;