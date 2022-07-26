const apiKey =
  "gq111BBb6kvbF_0rGChlYVVCxHnSGNFSDzA-D31Ye_p_N7R2oPP4BWRWaX01OKmIvYLkrzlL8VzCl1arJGolMakU9YUnn0MN5D3qmSGVRSj0Pf0Db9bgOjaFQyjeYnYx";
const Yelp = {
  async searchYelp(term, location, sortBy) {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const jsonResponse = await response.json();
    if (jsonResponse.businesses) {
      return jsonResponse.businesses.map((business) => {
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
        };
      });
    }
  },
};

export default Yelp;
