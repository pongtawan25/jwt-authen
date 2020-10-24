import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UserList from "./components/UserList";

function App() {
  const redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/userlist" component={UserList} />
          <Route exact path="/" component={redirectToLogin} />
          <Route path="*" component={redirectToLogin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
