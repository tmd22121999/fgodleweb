import logo from './logo.svg';
import './App.css';
import Fgodle from './Fgodle';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body" >
        <Fgodle/>
      </body>
    </div>
  );
}

export default App;
