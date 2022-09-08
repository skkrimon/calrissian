import { Scanner } from './lib/scanner';

function App() {
  const test = async () => {
    const scanner = new Scanner('/Users/simonzapf/Entwicklung/www/');
    await scanner.scanDir();

    console.log(scanner.landoEnviorments);
  };

  return (
    <>
      <button onClick={test}>Test</button>
    </>
  );
}

export default App;
