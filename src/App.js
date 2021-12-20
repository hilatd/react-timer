import React from 'react';
import './App.css';
import TimerLayout from './routes/timerLayout/components/component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Timer
      </header>
      <div>
        <TimerLayout port={8888}></TimerLayout>
      </div>
    </div>
  );
}


export default App;
