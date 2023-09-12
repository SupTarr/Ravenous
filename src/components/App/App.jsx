import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Yelp from "../../util/Yelp";

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
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      if (businesses !== undefined) {
        this.setState({ businesses: businesses, error: null });
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
