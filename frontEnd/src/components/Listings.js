import React from 'react';
import './Listings.css'; // Add this to style the card and gallery

// Dynamically load all images from the folder
function importAll(r) {
  return r.keys().map(r);
}

// This will import all images from the `assets/property-517` folder
const images = importAll(require.context('./../photos/517', false, /\.(png|jpe?g|svg)$/));

const Listings = () => {
  const property = {
    address: '517 Van Ness St, Daytona Beach, FL 32114',
    price: '$420,000',
    rent: '$2500',
    description: 'A beautiful 3-bedroom, 2-bathroom home located in the heart of Daytona Beach, perfect for families or vacationers.',
    images: images, // Dynamically loaded images
    redfinLink: 'https://www.zillow.com/homedetails/517-Van-Ness-St-Daytona-Beach-FL-32114/48026497_zpid/',
    zillowLink: 'https://www.zillow.com/homedetails/517-Van-Ness-St-Daytona-Beach-FL-32114/48026497_zpid/',
  };

  return (
    <section id="search-apply" className="search-apply">
      <h1>Listings</h1>

      {/* Property Card */}
      <div className="property-card">
        <h2 className="property-address">{property.address}</h2>

        {/* Scrollable Photo Gallery */}
        <div className="photo-gallery">
          {property.images.map((image, index) => (
            <img key={index} src={image} alt={`Property ${index + 1}`} className="property-photo" />
          ))}
        </div>

        <p className="property-price">Price: {property.price}</p>
        <p className="property-rent">Rent: {property.rent}</p>
        <p className="property-description">{property.description}</p>

        {/* Buttons */}
        <div className="button-group">
          <button className="apply-button">Apply</button>
          <button className="availability-button">Check Availability</button>
        </div>

        {/* External Links to Redfin and Zillow */}
        <div className="external-links">
          <a href={property.redfinLink} target="_blank" rel="noopener noreferrer">
            <img src="/logos/redfin-logo.png" alt="Redfin" className="property-link-logo" />
          </a>
          <a href={property.zillowLink} target="_blank" rel="noopener noreferrer">
            <img src="/logos/zillow-logo.png" alt="Zillow" className="property-link-logo" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Listings;
