import React from 'react';
import UserLogin from './components/userlogin';
import AdminLogin from './components/adminlogin';
import UserRegister from './components/userregister';
import UpdateData from './components/updatepage';
import AdminRegister from './components/adminregister';
import ShowDetails from './components/showDetails';
import UpdatePassword from './components/updatepassword';
import headerIcon from './header-icon.png'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <header><img src={headerIcon} alt="Header Icon"></img><h2>Management Nexus</h2></header>
      <div>
        <Router>
          <Routes>
            <Route exact path="/userlogin" element={<UserLogin />} />
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            <Route exact path="/userregister" element={<UserRegister/>}/>
            <Route exact path="/adminregister" element={<AdminRegister/>}/>
            <Route exact path="/updatedata" element={<UpdateData/>}/>
            <Route exact path="/showdetails" element={<ShowDetails/>}/>
            <Route exact path="/updatepassword" element={<UpdatePassword/>}/>
            <Route exact path="/" element={<UserLogin />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;