import { Bootstrap } from './lib/bootstrap';

function App() {
  const bootstrap = () => {
    const boot = new Bootstrap();
    boot.init();
  };

  return (
    <>
      <button onClick={bootstrap}>Hello World!</button>
    </>
  );
}

export default App;
