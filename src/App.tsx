import { useEffect, useState } from 'react';
import Environment from './components/Environment';
import { Scanner } from './lib/scanner';
import { LandoEnv } from './models/lando-env';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';

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

    const scanner = new Scanner('/Users/simonzapf/Entwicklung/www/');
    scanner.scanDir().then(() => {
      setLandoEnvs(scanner.parse());
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      {landoEnvs.map((landoEnv, index) => (
        <div className='card' key={index}>
          <Environment env={landoEnv} />
        </div>
      ))}
    </ThemeProvider>
  );
}

export default App;
