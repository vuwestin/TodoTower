import Header from './Components/Header.js';
import Board from './Components/Board.js';
import { useState } from "react";

import './App.css';

function App() {
  const [signedInStatus,  setsignedInStatus] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        { !signedInStatus.isSignedIn && <Header login={setsignedInStatus} />}
        { signedInStatus.isSignedIn && <Board userInfo={signedInStatus} logout={setsignedInStatus} /> }
      </header>
    </div>
  );
}

export default App;