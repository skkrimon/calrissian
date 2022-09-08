import { Bootstrap } from './lib/bootstrap';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const boot = new Bootstrap();
    boot.init();
  }, []);

  return (
    <>
      <h1>Hello World!</h1>
    </>
  );
}

export default App;
