import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import EditProfile from './component/EditProfile';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" component={Dashboard} />
            <Route path="/regis" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/edit-profile" component={EditProfile} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
