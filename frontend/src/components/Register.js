import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6 p-5">
        <h1>Register</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await axios.post(
              "http://localhost:5000/user/register",
              {
                username,
                password,
                name,
                role,
              }
            );
            if (result) {
              alert("Register success!");
              props.history.push("/login");
            } else {
              alert("Some thing went wrong!");
            }
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fullname</label>
            <input
              type="text"
              className="form-control"
              placeholder="Fullname"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
          <Link to="/" className="btn btn btn-dark-link">
            Cancel
          </Link>
        </form>
      </div>
      <div className="col-md-12 col-lg-6 p-5">
        <img src="/images/jwt.png" alt="jwt" width="500" />
        <img src="/images/jwt2.png" alt="jwt" width="500" />
      </div>
    </div>
  );
}
