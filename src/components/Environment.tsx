import Box from '@mui/material/Box/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Collapse from '@mui/material/Collapse/Collapse';
import Icon from '@mui/material/Icon/Icon';
import IconButton from '@mui/material/IconButton/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Typography from '@mui/material/Typography/Typography';
import { ChildProcess } from '@tauri-apps/api/shell';
import { useState } from 'react';
import { Lando } from '../lib/lando';
import { Notification } from '../lib/notification';
import { LandoEnv } from '../models/lando-env';
import UrlModal from './UrlModal';
import JSONPretty from 'react-json-pretty';
import * as dJSON from 'dirty-json';

interface EnvironmentProps {
  env: LandoEnv;
}

function Environment({ env }: EnvironmentProps) {
  const notifications = new Notification();

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(false);
  const [expanded, setExpanded]: [boolean, (expanded: boolean) => void] = useState(false);
  const [landoInfo, setLandoInfo]: [string, (landoInfo: string) => void] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      loadInfo();
    }
  };

  const loadInfo = () => {
    if (landoInfo === '') {
      setLoading(true);
    }
    Lando.info(env.path).then((out: ChildProcess) => {
      const json = JSON.stringify(dJSON.parse(out.stdout));
      setLandoInfo(json);
      setLoading(false);
    });
  };

  const onStart = () => {
    notifications.send('Starting ' + env.name);
    setLoading(true);
    Lando.start(env.path).then(() => {
      notifications.send('Successfully started ' + env.name);
      setLoading(false);
      env.running = true;
    });
  };

  const onStop = () => {
    notifications.send('Stopping ' + env.name);
    setLoading(true);
    Lando.stop(env.path).then(() => {
      notifications.send('Successfully stopped ' + env.name);
      setLoading(false);
      env.running = false;
    });
  };

  const onRestart = () => {
    notifications.send('Restarting ' + env.name);
    setLoading(true);
    Lando.restart(env.path).then(() => {
      notifications.send('Successfully restarted ' + env.name);
      setLoading(false);
      env.running = true;
    });
  };

  const onDestroy = () => {
    notifications.send('Destroying ' + env.name);
    setLoading(true);
    Lando.destroy(env.path).then(() => {
      notifications.send('Successfully destroyed ' + env.name);
      setLoading(false);
      env.running = false;
    });
  };

  const onRebuild = () => {
    notifications.send('Rebuilding ' + env.name);
    setLoading(true);
    Lando.rebuild(env.path).then(() => {
      notifications.send('Successfully rebuílded ' + env.name);
      setLoading(false);
    });
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <CardHeader
          title={
            <Typography component='div' variant='h5'>
              {env.name}
            </Typography>
          }
          subheader={env.path}
        ></CardHeader>
        <CardContent>
          <Typography>
            Status:{' '}
            <i style={{ color: env.running ? 'green' : 'red' }}>
              {env.running ? 'running' : 'stopped'}
            </i>
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', pl: 1, pb: 1 }}>
          <CardActions>
            <UrlModal path={env.path} />
            {env.running ? (
              <Tooltip title='Stop'>
                <IconButton disabled={loading} onClick={onStop}>
                  <Icon>pause</Icon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Start'>
                <IconButton disabled={loading} onClick={onStart}>
                  <Icon>play_arrow</Icon>
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title='Restart'>
              <IconButton disabled={loading} onClick={onRestart}>
                <Icon>restart_alt</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Rebuild'>
              <IconButton disabled={loading} onClick={onRebuild}>
                <Icon>construction</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Destroy'>
              <IconButton disabled={loading} onClick={onDestroy}>
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
            {!expanded ? (
              <Tooltip title='Show Info'>
                <IconButton onClick={handleExpandClick}>
                  <Icon>expand_more</Icon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Hide Info'>
                <IconButton onClick={handleExpandClick}>
                  <Icon>expand_less</Icon>
                </IconButton>
              </Tooltip>
            )}
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent sx={{ fontSize: '12px' }}>
              <JSONPretty data={landoInfo}></JSONPretty>
            </CardContent>
          </Collapse>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20%',
        }}
      >
        {loading && <CircularProgress />}
      </Box>
    </Card>
  );
}

export default Environment;
