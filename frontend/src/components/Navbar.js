import React from "react";
import { Link, withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Navbar(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  let token = null;
  let decoded = null;
  if (user) {
    token = user.token;
    decoded = jwtDecode(token);
  }
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-center">
      <a className="navbar-brand">JWT Authentication</a>
      {user ? (
        <div>
          <a className="navbar-brand">| {decoded.name} |</a>
          <button
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={() => {
              localStorage.removeItem("user");
              props.history.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-2 my-sm-0 mr-2">
            Login
          </Link>
          <span style={{ color: "white" }}>|</span>
          <Link
            to="/register"
            className="btn btn-outline-light my-2 my-sm-0 ml-2"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default withRouter(Navbar);
