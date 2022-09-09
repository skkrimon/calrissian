import Box from '@mui/material/Box/Box';
import Icon from '@mui/material/Icon/Icon';
import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal/Modal';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { Lando } from '../lib/lando';
import * as dJSON from 'dirty-json';
import { ChildProcess } from '@tauri-apps/api/shell';
import Tooltip from '@mui/material/Tooltip/Tooltip';

interface UrlModalProps {
  path: string;
}

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

function UrlModal({ path }: UrlModalProps) {
  const defaultInfo: LandoInfo[] = [{ service: '', urls: [''] }];
  const [landoInfos, setLandoInfos]: [LandoInfo[], (landoInfos: LandoInfo[]) => void] =
    useState(defaultInfo);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setLandoInfos(defaultInfo);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);

    Lando.info(path).then((out: ChildProcess) => {
      const infos: any[] = dJSON.parse(out.stdout);

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
                <Typography sx={{ mt: '10px'}} variant='h5'>{landoInfo.service}</Typography>
                {landoInfo.urls.map((url, index) => (
                  <Typography key={index}>{url}</Typography>
                ))}
              </div>
            ))}
        </Box>
      </Modal>
    </div>
  );
}

export default UrlModal;
