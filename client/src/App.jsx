import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    (async() => {
      const x = await axios.get('/meme');
      console.log(x);
    })()
  })
  return (
    <div className="App">
      <p>Meme</p>
    </div>
  );
}

export default App;
