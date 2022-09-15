import {
  Card,
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Tooling } from '../models/tooling';
import { Command as TauriCommand } from '@tauri-apps/api/shell';

interface CommandProps {
  tooling: Tooling;
}

function Command(props: CommandProps) {
  const run = () => {
    new TauriCommand('open-zsh', '"-c lando list"');
  };

  return (
    <Card sx={{ minWidth: 468, backgroundColor: 'black', marginTop: '10px' }}>
      <CardContent>
        <Typography variant='h6' component='div'>
          {props.tooling.name}
        </Typography>
        <Typography variant='body2'>{props.tooling.description}</Typography>
        {/* <TextField size='small' sx={{ marginTop: '10px' }} id='args' label='Args' type='input' /> */}
      </CardContent>
      {/* <CardActions>
        <Tooltip title='Stop'>
          <IconButton onClick={run}>
            <Icon>pause</Icon>
          </IconButton>
        </Tooltip>
      </CardActions> */}
    </Card>
  );
}

export default Command;
