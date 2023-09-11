import React from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Yelp from "../../util/Yelp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    if (term !== "" || location !== "") {
      Yelp.searchYelp(term, location, sortBy).then((businesses) => {
        if (businesses !== undefined) {
          this.setState({ businesses: businesses });
        } else {
          alert("No businesses found");
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
