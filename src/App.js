import './App.css';
import { datadogRum } from '@datadog/browser-rum';
import { useEffect, useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    datadogRum.startView({ service: 'my-service', name: 'my-service' })
  }, [])

  const fetchSomething = () => {
    fetch("http://httpstat.us/500")
  }

  const changeRoute = () => {
    setCounter(c => {
      window.history.pushState("", "", `/new-route${counter}`);
      return c + 1;
    })
  }

  return (
    <div className="App">
      <button onClick={fetchSomething}>Fetch something</button>
      <button onClick={changeRoute}>Change route</button>
    </div>
  );
}

export default App;
