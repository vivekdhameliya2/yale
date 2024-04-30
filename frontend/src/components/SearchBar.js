import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');  // State to store the input from the user

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submit behavior
    if (input.trim() === '') {
      alert('Please enter a valid search query.');  // Basic validation to ensure input is not empty
      return;
    }
    onSearch(input);  // Call the onSearch function passed from the parent component with the user input
    setInput('');  // Optionally clear the input after search
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}  // Update the state with the user input on change
        placeholder="Enter search term..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar; 