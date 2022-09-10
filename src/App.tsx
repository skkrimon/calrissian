import { useEffect, useState } from 'react';
import Environment from './components/Environment';
import { Scanner } from './lib/scanner';
import { LandoEnv } from './models/lando-env';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Spinner from './components/Spinner';
import { Lando } from './lib/lando';
import { type } from '@tauri-apps/api/os';
import { Notification } from './lib/notification';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const notification = new Notification();

  const defaultLandoEnvs: LandoEnv[] = [];
  const [isRefreshing, setIsRefreshing]: [boolean, (isRefreshing: boolean) => void] =
    useState(false);
  const [landoEnvs, setLandoEnvs]: [LandoEnv[], (landoEnvs: LandoEnv[]) => void] =
    useState(defaultLandoEnvs);

  useEffect(() => {
    loadEnvs();
  }, []);

  const loadEnvs = async () => {
    const osType = await type();
    let path = '/Users/simonzapf/Entwicklung/www/';

    if (osType === 'Windows_NT') {
      path = 'C:\\Dev\\www';
    }

    setIsRefreshing(true);
    const scanner = new Scanner(path);
    await scanner.scanDir();

    const parsed = await scanner.parse();
    setLandoEnvs(parsed);
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    loadEnvs();
  };

  const handlePoweroff = async () => {
    notification.send('Stopping all running Lando Environments');
    setIsRefreshing(true);
    await Lando.poweroff();
    loadEnvs();
    notification.send('Stopped all Lando Environments');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isRefreshing && <Spinner />}
      <Header handleRefresh={handleRefresh} handlePoweroff={handlePoweroff} />
      {landoEnvs.map((landoEnv, index) => (
        <div className='card' key={index}>
          <Environment env={landoEnv} />
        </div>
      ))}
    </ThemeProvider>
  );
}

export default App;
