import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Custom CSS for styling
import Navbar from './Navbar';
import axios from 'axios'; // Import axios to make API calls

import {useNavigate} from 'react-router-dom'

const HomePage = () => {
  const [properties, setProperties] = useState([]); // State to store fetched properties
  const [loading, setLoading] = useState(true); // State for loading indication
  const [minPrice, setMinPrice] = useState(''); // State for start range
  const [maxPrice, setMaxPrice] = useState(''); // State for end range
  const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties

  const navigate=useNavigate();


  useEffect(()=>{
      const cn=localStorage.getItem('user');

      if(!cn){
        navigate('/login');
      }

  },[])

  // Fetch data from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/fetch/data');
        setProperties(response.data); // Assuming the API returns an array of properties
        setFilteredProperties(response.data); // Initially, show all properties
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchProperties();
  }, []);

  
  const handleFilter = async () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;
    console.log(min,max);

    try {
      const response = await axios.get('http://localhost:8000/api/fetch/data', {
        params: { min, max },
      });

      console.log(response);

      // Extract the data from the response
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="title">Exclusive Real Estate Listings</h1>

        {/* Search section */}
        <div className="search-section">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="search-input"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="search-input"
          />
          <button onClick={handleFilter} className="search-button">Search</button>
        </div>

        {/* Loading indicator */}
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="scrollable-container">
            <div className="scrollable-grid">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div className="card" key={property.propertyId}>
                    <div className="card-header">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="card-img"
                      />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{property.title}</h2>
                      <p className="card-description">{property.description}</p>
                      <p className="card-price">{property.price}</p>
                      <p className="card-location">📍 {property.location}</p>
                      <button
                        className={`card-button ${
                          property.available ? 'available' : 'sold-out'
                        }`}
                      >
                        {property.available ? 'Available' : 'Sold Out'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No properties found within the selected price range.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
