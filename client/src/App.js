import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import EditProfile from './component/EditProfile';
import { AuthProvider } from "./component/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/regis" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/edit" element={<EditProfile/>} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
