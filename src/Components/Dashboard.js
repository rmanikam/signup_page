// @ts-ignore
import React, { Component } from "react";

export default class Dashboard extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    const currentUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    this.setState({ user: currentUser });
  }
  render() {
    const { user } = this.state;

    return (
      <div>
        &nbsp; hi &nbsp;
        {user && user.name}
      </div>
    );
  }
}
