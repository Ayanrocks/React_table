import React, { Component } from "react";
import axios from "axios";
import Tables from "./components/Tables";
import Pagination from "./components/Pagination";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json",
      users: [],
      pageNumber: 1
    };
  }
  increase = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };
  decrease = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));
  };

  componentDidMount() {
    axios
      .get(this.state.url)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(e => console.log(e));
  }
  render() {
    const { users, pageNumber } = this.state;
    console.log(pageNumber);

    return (
      <div>
        <h1>Hello from React</h1>
        <Tables users={users.slice((pageNumber - 1) * 5, pageNumber * 5)} />

        <Pagination increase={this.increase} decrease={this.decrease} />
      </div>
    );
  }
}
