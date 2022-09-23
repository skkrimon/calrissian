import { Box, Button, Modal, Typography } from '@mui/material';

type WarnModalProps = {
  open: boolean;
  title: string;
  message: string;
  btnText: string;
  btnFn: () => void;
};

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
  height: 220,
  overflow: 'hidden',
};

function WarnModal(props: WarnModalProps): JSX.Element {
  return (
    <Modal
      open={props.open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {props.title}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          {props.message}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Button onClick={props.btnFn}>{props.btnText}</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default WarnModal;
