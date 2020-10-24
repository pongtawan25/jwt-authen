import React, { useState, useHistory } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="row mt-5">
      <div className="col-md-12 col-lg-6 p-5">
        <img src="/images/jwt.png" alt="jwt" width="500" />
      </div>
      <div className="col-md-12 col-lg-6 p-5">
        <h1>Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await axios.post(
              "http://localhost:5000/user/login",
              {
                username,
                password,
              }
            );
            if (result.data.token) {
              localStorage.setItem("user", JSON.stringify(result.data));
              props.history.push("/profile");
            } else {
              alert(JSON.stringify(result.data));
            }
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary mr-2">
            Login
          </button>
          <Link to="/register" className="btn btn btn-link">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
