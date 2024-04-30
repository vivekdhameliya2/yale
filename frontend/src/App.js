import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import DetailedView from './components/DetailedView';

function App() {
    const [results, setResults] = useState([]);  // Holds search results (list of IDs)
    const [selectedDetail, setSelectedDetail] = useState(null);  // Holds detailed data for a selected ID
    const [error, setError] = useState('');  // Error handling

    const handleSearch = async (query) => {
        setError('');
        if (!query) {
            setError('Please enter a search query.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/search', JSON.stringify({ query }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data && response.data.idlist && response.data.idlist.length > 0) {
                setResults(response.data.idlist.map(id => ({ id })));  // Assuming the server returns an array of IDs
            } else {
                setError('No results found.');
                setResults([]);
            }
        } catch (error) {
            setError('Failed to fetch data. Please check the server.');
            setResults([]);
            console.error('Search error:', error);
        }
    };

    const fetchDetails = async (id) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/details?ids=${id}`);
          console.log("=-=-=-", response);
          setSelectedDetail(response.data[0]); // Assuming the API returns an array of one object
      } catch (error) {
          setError('Failed to fetch details.');
          console.error('Details fetch error:', error);
      }
  };
  

    return (
        <div className="App">
            <h1>PubMed Search Application</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ResultsList results={results} onSelectDetail={fetchDetails} />
            {selectedDetail && <DetailedView details={selectedDetail} />}
        </div>
    );
}

export default App;