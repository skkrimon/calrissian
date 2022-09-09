import { useEffect, useState } from 'react';
import Environment from './components/Environment';
import { Scanner } from './lib/scanner';
import { LandoEnv } from './models/lando-env';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { Checker } from './lib/checker';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const defaultLandoEnvs: LandoEnv[] = [];
  const [landoEnvs, setLandoEnvs]: [LandoEnv[], (landoEnvs: LandoEnv[]) => void] =
    useState(defaultLandoEnvs);

  useEffect(() => {
    // macos path: /Users/simonzapf/Entwicklung/www/
    // Windows path: C:\\Dev\\www

    loadEnvs();
  }, []);

  const loadEnvs = async () => {
    const scanner = new Scanner('/Users/simonzapf/Entwicklung/www/');
    
    await scanner.scanDir();

    const parsed = await scanner.parse();
    setLandoEnvs(parsed);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header handleRefresh={loadEnvs} />
      {landoEnvs.map((landoEnv, index) => (
        <div className='card' key={index}>
          <Environment env={landoEnv} />
        </div>
      ))}
    </ThemeProvider>
  );
}

export default App;
