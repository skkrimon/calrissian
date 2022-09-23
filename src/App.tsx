import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import Environment from './components/Environment';
import Header from './components/Header';
import Spinner from './components/Spinner';
import { Checker } from './lib/checker';
import { ConfigLoader } from './lib/config-loader';
import { Lando } from './lib/lando';
import { Notification } from './lib/notification';
import { Scanner } from './lib/scanner';
import { Config } from './models/config';
import { LandoEnv } from './models/lando-env';
import { darkTheme } from './utils/theme';

function App(): JSX.Element {
  const notification = new Notification();
  const defaultLandoEnvs: LandoEnv[] = [];
  const defaultConfig: Config = { projectDir: '' };

  const [search, setSearch]: [string, (filter: string) => void] = useState('');
  const [isRefreshing, setIsRefreshing]: [boolean, (isRefreshing: boolean) => void] =
    useState(false);
  const [landoEnvs, setLandoEnvs]: [LandoEnv[], (landoEnvs: LandoEnv[]) => void] =
    useState(defaultLandoEnvs);
  const [config, setConfig]: [Config, (config: Config) => void] = useState(defaultConfig);
  const [dockerRunning, setDockerRunning]: [boolean, (dockerRunning: boolean) => void] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async (): Promise<void> => {
    const isRunning = await Checker.checkDockerRunning();
    setDockerRunning(isRunning);

    if (!isRunning) {
      return;
    }

    setIsRefreshing(true);
    await loadConfig();
    await loadEnvs();
    setIsRefreshing(false);
  };

  const loadEnvs = async (): Promise<void> => {
    const scanner = new Scanner(config.projectDir);
    await scanner.scanDir();

    const parsed = await scanner.parse();
    setLandoEnvs(parsed);
  };

  const loadConfig = async (): Promise<void> => {
    const configLoader = new ConfigLoader();
    const loadedConfig = await configLoader.load();

    setConfig(loadedConfig);
  };

  const handleRefresh = (): void => {
    init();
  };

  const handlePoweroff = async (): Promise<void> => {
    notification.send('Stopping all running Lando Environments');
    setIsRefreshing(true);
    await Lando.poweroff();
    await loadEnvs();
    notification.send('Stopped all Lando Environments');
  };

  const handleSearch = (value: string): void => {
    setSearch(value.toLowerCase().trim());
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isRefreshing && <Spinner />}
      <Header
        handleRefresh={handleRefresh}
        handlePoweroff={handlePoweroff}
        handleSearch={handleSearch}
        config={config}
      />
      {landoEnvs.map((landoEnv, index) => {
        if (landoEnv.name?.includes(search)) {
          return (
            <div className='card' key={index}>
              <Environment env={landoEnv} />
            </div>
          );
        }
      })}
    </ThemeProvider>
  );
}

export default App;
