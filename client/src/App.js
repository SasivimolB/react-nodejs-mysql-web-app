import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import EditProfile from './component/EditProfile';
//import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          {/* <Routes>
            <Route exact path="/" element={<PrivateRoute/>}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
            <Route path="/regis" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/edit-profile" element={<PrivateRoute/>}>
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
          </Routes> */}
          <Routes>
            <Route exact path="/" element={<Register/>} />
            <Route path="/regis" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/edit-profile" element={<EditProfile/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
