import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Icon,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { ConfigLoader } from '../lib/config-loader';
import { Config } from '../models/config';

interface SettingsProps {
  config: Config;
  handleRefresh: () => void;
}

function Settings(props: SettingsProps) {
  const [open, setOpen]: [boolean, (open: boolean) => void] = useState(false);
  const [projectDir, setProjectDir]: [string, (projectDir: string) => void] = useState('');

  const handleOpen = () => {
    setProjectDir(props.config.projectDir);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickClose = async () => {
    const updatedConfig: Config = {
      projectDir
    };

    await ConfigLoader.writeConfig(updatedConfig);

    setOpen(false);
    props.handleRefresh();
  };

  return (
    <>
      <Tooltip title='Settings'>
        <IconButton onClick={handleOpen} aria-label='settings' size='large'>
          <Icon>settings</Icon>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              marginTop: '10px',
              width: '200px'
            }}
            id='search'
            onChange={(e) => setProjectDir(e.target.value)}
            value={projectDir}
            size='small'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
