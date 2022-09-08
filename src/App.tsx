import { Scanner } from './lib/scanner';

function App() {
  const test = async () => {
    const scanner = new Scanner('C:\\Dev\\www');
    await scanner.scanDir();
  };

  return (
    <>
      <button onClick={test}>Test</button>
    </>
  );
}

export default App;
