import React, { Component } from "react";
import axios from "axios";

export default class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.fetchUsersData();
  }

  fetchUsersData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const result = await axios.get(`http://localhost:5000/user`, {
      headers: { Authorization: `${user.token}` },
    });
    this.setState({ users: result.data });
  };

  showUsersData = () => {
    return (
      this.state.users &&
      this.state.users.map((item, index) => (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.name}</td>
          <td>{item.role}</td>
        </tr>
      ))
    );
  };

  render() {
    return (
      <div className="row">
        <div className="col p-5">
          <h1>User List</h1>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>{this.showUsersData()}</tbody>
          </table>
          <button
            className="btn btn-dark"
            onClick={() => this.props.history.goBack()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}
