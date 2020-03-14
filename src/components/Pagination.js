import React, { useEffect, useState, PureComponent } from "react";

export default class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayPage: []
    };
  }

  componentDidMount() {
    this.changePageArray();
  }

  changePageArray() {
    let { displayPage } = this.state;
    const { pages, currentPage } = this.props;
    if (currentPage === 1 || currentPage === 2) {
      displayPage = pages.slice(currentPage - 1, currentPage + 4);
      this.setState({ displayPage });
    } else if (currentPage === pages.length || currentPage === pages.length - 2) {
      displayPage = pages.slice(currentPage - 3, currentPage);
      this.setState({ displayPage });
    } else {
      displayPage = pages.slice(currentPage - 3, currentPage + 2);
      this.setState({ displayPage });
    }

    console.log(displayPage);
  }

  render() {
    const { displayPage } = this.state;

    const { increase, decrease, pages, currentPage, clickedPage } = this.props;
    return (
      <div className="pagination">
        <button
          onClick={() => {
            decrease();
            this.changePageArray();
          }}
        >
          Previous
        </button>
        {pages.map(page => (
          <div
            className={currentPage === page ? "page current-page " : "page"}
            key={page}
            onClick={() => clickedPage(page)}
          >
            <p>{page}</p>
          </div>
        ))}
        <button onClick={() => {
            increase();
            this.changePageArray();
          }}>Next</button>
      </div>
    );
  }
}
