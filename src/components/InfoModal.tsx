import ReactJson from '@microlink/react-json-view';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Icon from '@mui/material/Icon/Icon';
import IconButton from '@mui/material/IconButton/IconButton';
import Modal from '@mui/material/Modal/Modal';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { ChildProcess } from '@tauri-apps/api/shell';
import * as dJSON from 'dirty-json';
import React, { useState } from 'react';

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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  height: 400,
  width: '90%',
  overflow: 'auto',
  fontSize: '12px',
};

function UrlModal({ path }: UrlModalProps): JSX.Element {
  const defaultInfo: LandoInfo[] = [{ service: '', urls: [''] }];
  const [landoInfos, setLandoInfos]: [LandoInfo[], (landoInfos: LandoInfo[]) => void] =
    useState(defaultInfo);
  const [open, setOpen]: [boolean, (open: boolean) => void] = useState(false);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(false);

  const handleClose = (): void => {
    setLandoInfos(defaultInfo);
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
    setLoading(true);

    Lando.info(path).then((out: ChildProcess) => {
      const infos: LandoInfo[] = dJSON.parse(out.stdout);
      setLandoInfos(infos);
      setLoading(false);
    });
  };

  return (
    <div>
      <Tooltip title='Infos'>
        <IconButton onClick={handleOpen}>
          <Icon>info</Icon>
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                <CircularProgress size='4rem' />
              </div>
            </Box>
          ) : (
            <ReactJson
              src={landoInfos}
              theme='brewer'
              collapsed={1}
              displayDataTypes={false}
              enableClipboard={false}
            ></ReactJson>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default UrlModal;
