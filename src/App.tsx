import { useEffect, useState } from 'react';
import Environment from './components/Environment';
import { Scanner } from './lib/scanner';
import { LandoEnv } from './models/lando-env';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Spinner from './components/Spinner';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const defaultLandoEnvs: LandoEnv[] = [];
  const [isRefreshing, setIsRefreshing]: [boolean, (isRefreshing: boolean) => void] =
    useState(false);
  const [landoEnvs, setLandoEnvs]: [LandoEnv[], (landoEnvs: LandoEnv[]) => void] =
    useState(defaultLandoEnvs);

  useEffect(() => {
    // macos path: /Users/simonzapf/Entwicklung/www/
    // Windows path: C:\\Dev\\www

    loadEnvs();
  }, []);

  const loadEnvs = async () => {
    setIsRefreshing(true);
    const scanner = new Scanner('/Users/simonzapf/Entwicklung/www/');
    await scanner.scanDir();

    const parsed = await scanner.parse();
    setLandoEnvs(parsed);
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    loadEnvs();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isRefreshing && <Spinner />}
      <Header handleRefresh={handleRefresh} />
      {landoEnvs.map((landoEnv, index) => (
        <div className='card' key={index}>
          <Environment env={landoEnv} />
        </div>
      ))}
    </ThemeProvider>
  );
}

export default App;
