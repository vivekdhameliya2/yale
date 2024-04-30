import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/search', { query });
      onSearch(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter search term..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
