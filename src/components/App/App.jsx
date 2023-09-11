import { useState } from "react";
import "./App.css";
import BusinessList from "../BusinessList/BusinessList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Yelp from "../../util/Yelp";

function App(props) {
  const [businesses, setBusinesses] = useState([]);

  const searchYelp = (term, location, sortBy) => {
    if (term !== "" || location !== "") {
      Yelp.searchYelp(term, location, sortBy).then((businesses) => {
        if (businesses !== undefined) {
          setBusinesses(businesses);
        } else {
          alert("No businesses found");
        }
      });
    }
  };

  return (
    <div className="App">
      <h1>ravenous</h1>
      <SearchBar searchYelp={searchYelp} />
      <BusinessList businesses={businesses} />
    </div>
  );
}

export default App;
