import { ChildProcess } from '@tauri-apps/api/shell';
import { Lando } from './lib/lando';

function App() {
  const start = async () => {
    Lando.start('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });
  };

  const info = async () => {
    Lando.start('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  const stop = async () => {
    Lando.stop('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  const destroy = async () => {
    Lando.destroy('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  const rebuild = async () => {
    Lando.rebuild('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  const restart = async () => {
    Lando.restart('/Users/simonzapf/Entwicklung/www/test').then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  const poweroff = async () => {
    Lando.poweroff().then((std: ChildProcess) => {
      console.log(std.stdout);
    });  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={info}>Info</button>
      <button onClick={restart}>Restart</button>
      <button onClick={rebuild}>Rebuild</button>
      <button onClick={destroy}>Destroy</button>
      <button onClick={poweroff}>Poweroff</button>
    </>
  );
}

export default App;
