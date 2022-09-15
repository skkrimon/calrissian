import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Icon, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

function Settings() {
    const [open, setOpen]: [boolean, (open: boolean) => void] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Tooltip title='Settings'>
              <IconButton onClick={handleOpen} aria-label='settings' size='large'>
                <Icon>settings</Icon>
              </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{'Use Google\'s location service?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Settings;