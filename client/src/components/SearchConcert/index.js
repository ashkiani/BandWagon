import React, { Component } from "react";
import SearchForm from "../SearchForm";
import SearchResults from "../SearchResults";
import API from "../../utils/API";
import axios from "axios";

class SearchConcert extends Component {
  state = {
    search: "",
    results: []
  };

  // When this component mounts, search the songkick API for concerts/festivals
  componentDidMount() {
    this.searchConcert("");
  }

  searchConcert = query => {
    API.search(query)
      .then(res => this.setState({ results: res.data.resultsPage.results.event }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchConcert(this.state.search);
  };

  render() {
    return (
      <div>
          <SearchForm
            search={this.state.search}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
        <div id="search-results" className="container">
        
          <h2 className="text-center">Look at all of the events...</h2>
          <hr />
          <SearchResults results={this.state.results} />
          {/* This is what the search results should look like when results are returned from the api */}
        </div>

      </div>
    );
  }
}

export default SearchConcert;
