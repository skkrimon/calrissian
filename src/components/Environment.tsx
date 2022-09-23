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
import { useState } from 'react';

import { Lando } from '../lib/lando';
import { Notification } from '../lib/notification';
import { LandoEnv } from '../models/lando-env';
import Command from './Command';
import InfoModal from './InfoModal';
import UrlModal from './UrlModal';

type EnvironmentProps = {
  env: LandoEnv;
};

function Environment({ env }: EnvironmentProps): JSX.Element {
  const notifications = new Notification();

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(false);
  const [expanded, setExpanded]: [boolean, (expanded: boolean) => void] = useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const onStart = (): void => {
    notifications.send('Starting ' + env.name);
    setLoading(true);
    Lando.start(env.path).then(() => {
      notifications.send('Successfully started ' + env.name);
      setLoading(false);
      env.running = true;
    });
  };

  const onStop = (): void => {
    notifications.send('Stopping ' + env.name);
    setLoading(true);
    Lando.stop(env.path).then(() => {
      notifications.send('Successfully stopped ' + env.name);
      setLoading(false);
      env.running = false;
    });
  };

  const onRestart = (): void => {
    notifications.send('Restarting ' + env.name);
    setLoading(true);
    Lando.restart(env.path).then(() => {
      notifications.send('Successfully restarted ' + env.name);
      setLoading(false);
      env.running = true;
    });
  };

  const onDestroy = (): void => {
    notifications.send('Destroying ' + env.name);
    setLoading(true);
    Lando.destroy(env.path).then(() => {
      notifications.send('Successfully destroyed ' + env.name);
      setLoading(false);
      env.running = false;
    });
  };

  const onRebuild = (): void => {
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
            <Box sx={{ display: 'inline', color: env.running ? 'success.main' : 'error.main' }}>
              <i>{env.running ? 'running' : 'stopped'}</i>
            </Box>
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
            <InfoModal path={env.path} />
            {env.tooling.length > 0 &&
              (!expanded && env.tooling.length ? (
                <Tooltip title='Show Tooling'>
                  <IconButton onClick={handleExpandClick}>
                    <Icon>expand_more</Icon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Hide Tooling'>
                  <IconButton onClick={handleExpandClick}>
                    <Icon>expand_less</Icon>
                  </IconButton>
                </Tooltip>
              ))}
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent sx={{ width: '100%' }}>
              {env.tooling.map((tooling, index) => (
                <Command key={index} tooling={tooling} />
              ))}
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
