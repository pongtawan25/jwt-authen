import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  state = {
    users: {},
  };

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const decoded = jwtDecode(token);
    const result = await axios.get(
      `http://localhost:5000/user/profile/${decoded.username}`,
      {
        headers: { Authorization: `${user.token}` },
      }
    );
    this.setState({ users: result.data });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const decoded = jwtDecode(token);
    return (
      <div>
        <div className="row">
          <div className="col p-5">
            <h1>Profile</h1>
            <div className="text-center">
              <div className="jumbotron">
                <h1 className="display-6">{this.state.users.name}</h1>
                <hr className="my-4" />
                <p className="lead">Username: {this.state.users.username}</p>
                <p className="lead">Role: {this.state.users.role}</p>
              </div>
              {decoded.role === "admin" && (
                <Link to="/userlist" className="btn btn-dark">
                  View Users
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
