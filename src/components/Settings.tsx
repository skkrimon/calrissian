import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { open as openDialog } from '@tauri-apps/api/dialog';
import { appDir } from '@tauri-apps/api/path';
import { useState } from 'react';

import { ConfigLoader } from '../lib/config-loader';
import { Config } from '../models/config';

type SettingsProps = {
  config: Config;
};

function Settings(props: SettingsProps): JSX.Element {
  const [open, setOpen]: [boolean, (open: boolean) => void] = useState(false);
  const [projectDir, setProjectDir]: [string, (projectDir: string) => void] = useState('');

  const handleOpen = (): void => {
    setProjectDir(props.config.projectDir);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleClickClose = async (): Promise<void> => {
    const updatedConfig: Config = {
      projectDir,
    };

    await ConfigLoader.writeConfig(updatedConfig);

    setOpen(false);
  };

  const handleSelect = async (): Promise<void> => {
    const selected = await openDialog({
      directory: true,
      multiple: false,
      defaultPath: await appDir(),
    });

    if (selected === null || Array.isArray(selected)) {
      return;
    }

    setProjectDir(selected);
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
          <Box
            sx={{
              marginTop: '10px',
              width: '400px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              style={{ width: '340px' }}
              id='search'
              onChange={(e): void => setProjectDir(e.target.value)}
              value={projectDir}
              size='small'
              label='Path to project directory'
            />
            <IconButton onClick={handleSelect} size='large'>
              <Icon>folder</Icon>
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Tooltip placement='left' title='Multiple reloads may be required until settings apply'>
            <Button onClick={handleClickClose}>Apply</Button>
          </Tooltip>
          <Button onClick={handleClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
