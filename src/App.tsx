import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const sayHello = async () => {
      const data: string = await invoke('greet');
      setMsg(data);
    }

    sayHello()
  }, [])

  return (
    <>
      <h1>{ msg }</h1>
    </>
  );
}

export default App;
