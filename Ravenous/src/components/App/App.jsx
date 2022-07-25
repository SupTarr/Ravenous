import { useState } from "react";
import "./App.css";
import Business from "../Business/Business.jsx";
import BusinessList from "../BusinessList/BusinessList.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Yelp from "../../util/Yelp";

const business = {
  imageSrc: "https://content.codecademy.com/programs/react/ravenous/pizza.jpg",
  name: "MarginOtto Pizzeria",
  address: "1010 Paddington Way",
  city: "Flavortown",
  state: "NY",
  zipCode: "10101",
  category: "Italian",
  rating: 4.5,
  reviewCount: 90,
};
const businesses = [business, business, business, business, business, business];

function App(props) {
  const [businesses, setBusinesses] = useState([]);

  const searchYelp = (term, location, sortBy) => {
    Yelp.searchYelp(term, location, sortBy).then((businesses) => {
      setBusinesses(businesses);
    });
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
