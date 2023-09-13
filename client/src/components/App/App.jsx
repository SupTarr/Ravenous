import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      businesses: [],
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    fetch(`${import.meta.env.VITE_YELP_API_URL}/businesses/search`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ term: term, location: location, sortBy: sortBy }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          this.setState({ businesses: json, error: null });
        } else {
          this.setState({ error: "No businesses found" });
        }
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar
          searchYelp={this.searchYelp}
          onIsLoadingChange={(isLoading) =>
            this.setState({ isLoading: isLoading })
          }
          onErrorChange={(error) => this.setState({ error: error })}
        />
        {this.state.isLoading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
        {this.state.error && (
          <div className="error">
            <p>{this.state.error}</p>
          </div>
        )}
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
