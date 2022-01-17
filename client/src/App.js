import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <label>Username:</label><br/>
        <input type="text" name="username"/><br/>
        <label>Password:</label><br/>
        <input type="password" name="password"/><br/>
        <br/>
        <Button>Log in</Button>
      </div>
    </div>
  );
}

export default App;
