require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const yelp = require("yelp-fusion");
const client = yelp.client("YOUR_API_KEY");

const app = express();

const whiteList = [
  "http://localhost:3000",
  "https://ravenous.suptarr.vercel.app",
];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.post("/businesses/search", async (req, res) => {
  const apiKey = process.env.YELP_API;
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  const params = {
    term: req.body.term,
    location: req.body.location,
    sort_by: req.body.sortBy,
  };
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const jsonResponse = await response.json();

  if (jsonResponse.businesses) {
    return res.json(
      jsonResponse.businesses.map((business) => {
        return {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.category,
          rating: business.rating,
          reviewCount: business.review_count,
          url: business.url,
        };
      }),
    );
  } else {
    res.status(404).send("Not found");
  }
});

app.listen(3001);
