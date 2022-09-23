import Box from '@mui/material/Box/Box';
import Icon from '@mui/material/Icon/Icon';
import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal/Modal';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Typography from '@mui/material/Typography/Typography';
import { ChildProcess, open as openUrl } from '@tauri-apps/api/shell';
import * as dJSON from 'dirty-json';
import { useState } from 'react';

import { Lando } from '../lib/lando';

type UrlModalProps = {
  path: string;
};

interface LandoInfo {
  service: string;
  urls: string[];
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 400,
  overflow: 'auto',
};

function UrlModal({ path }: UrlModalProps): JSX.Element {
  const defaultInfo: LandoInfo[] = [{ service: '', urls: [''] }];
  const [landoInfos, setLandoInfos]: [LandoInfo[], (landoInfos: LandoInfo[]) => void] =
    useState(defaultInfo);
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setLandoInfos(defaultInfo);
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);

    Lando.info(path).then((out: ChildProcess) => {
      const infos: LandoInfo[] = dJSON.parse(out.stdout);

      const arr: LandoInfo[] = [];
      for (let i = 0; i < infos.length; i++) {
        const info = infos[i];

        if (info.urls.length < 1) {
          continue;
        }

        arr.push({
          service: info.service,
          urls: info.urls,
        });
      }

      setLandoInfos(arr);
    });
  };

  return (
    <div>
      <Tooltip title='URLs'>
        <IconButton onClick={handleOpen}>
          <Icon>link</Icon>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {landoInfos.map((landoInfo, index) => (
            <div key={index}>
              <Typography sx={{ mt: '10px' }} variant='h5'>
                {landoInfo.service}
              </Typography>
              {landoInfo.urls.map((url, index) => (
                <Typography
                  sx={{ '&:hover': { color: 'info.dark', cursor: 'pointer' } }}
                  key={index}
                  onClick={(): Promise<void> => openUrl(url)}
                >
                  {url}
                </Typography>
              ))}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}

export default UrlModal;
