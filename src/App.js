import React, { Component } from "react";
import axios from "axios";
import Tables from "./components/Tables";
import Pagination from "./components/Pagination";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "http://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json",
      // url: "https://jsonplaceholder.typicode.com/comments",
      users: [],
      pageNumber: 1,
      splitSize: 5,
      pages: [],
      filteredArray: []
    };
  }
  increase = () => {
    const { pageNumber, filteredArray, splitSize } = this.state;
    if (pageNumber === filteredArray.length / splitSize) {
      return null;
    }
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };
  decrease = () => {
    const { pageNumber } = this.state;
    if (pageNumber === 1) {
      return null;
    }
    this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));
  };

  clickedPage = page => {
    this.setState({ pageNumber: page });
  };

  sortTable = value => {
    const { filteredArray } = this.state;
    const sortedUsers = filteredArray.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    this.setState({ filteredArray: sortedUsers });
  };

  componentDidMount() {
    axios
      .get(this.state.url)
      .then(response => {
        this.setState({ users: response.data, filteredArray: response.data }, () => this.getTotalPages());
      })
      .catch(e => console.log(e));
  }

  getTotalPages = () => {
    const { users, splitSize, filteredArray } = this.state;
    const totalPages = parseInt(filteredArray.length / splitSize);
    const pages = [...Array(totalPages).keys()].map(i => i + 1);
    this.setState({ pages });
  };

  search = e => {
    const { users } = this.state;
    const text = e.target.value.toLowerCase();
    const filteredArray = users.filter(user => JSON.stringify(user).toLowerCase().includes(text));
    this.setState({ filteredArray }, this.getTotalPages);
  };

  render() {
    const { users, pageNumber, splitSize, pages, filteredArray } = this.state;
    return (
      <div>
        <h1>Hello from React</h1>
        <input className="searchBar" type="text" onInput={this.search} placeholder="Type to search" />
        {users && users.length > 1 && (
          <div>
            <div className="table__container">
              <Tables
                users={filteredArray.slice((pageNumber - 1) * splitSize, pageNumber * splitSize)}
                sortTable={this.sortTable}
              />
            </div>
            <Pagination
              increase={this.increase}
              decrease={this.decrease}
              pages={pages}
              currentPage={pageNumber}
              clickedPage={this.clickedPage}
            />
          </div>
        )}
      </div>
    );
  }
}
