import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css"; // Importing the CSS file
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import DetailedView from './components/DetailedView';
import Pagination from './components/Pagination'; // Importing Pagination component

function App() {
    const [results, setResults] = useState([]);  // Holds search results (list of IDs)
    const [selectedDetail, setSelectedDetail] = useState(null);  // Holds detailed data for a selected ID
    const [error, setError] = useState('');  // Error handling
    const [loading, setLoading] = useState(false); // Loading indicator state
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const itemsPerPage = 4; // Number of items per page

    const handleSearch = async (query) => {
        setError('');
        setLoading(true); // Set loading to true before making the request

        try {
            const response = await axios.post('http://localhost:5000/api/search', JSON.stringify({ query }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data && response.data.idlist && response.data.idlist.length > 0) {
                setResults(response.data.idlist.map(id => ({ id })));  // Assuming the server returns an array of IDs
                setTotalPages(Math.ceil(response.data.idlist.length / itemsPerPage));
                setCurrentPage(1); // Reset to first page after each search
            } else {
                setError('No results found.');
                setResults([]);
            }
        } catch (error) {
            setError('Failed to fetch data. Please check the server.');
            setResults([]);
            console.error('Search error:', error);
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    const fetchDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/details?ids=${id}`);
            setSelectedDetail(response.data[0]); // Assuming the API returns an array of one object
        } catch (error) {
            setError('Failed to fetch details.');
            console.error('Details fetch error:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return (
        <div className="App">
            <h1 className="header">PubMed Search Application</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <div className="loader"></div>} {/* Display loader animation */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ResultsList results={results.slice(startIndex, endIndex)} onSelectDetail={fetchDetails} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="pagination" />
            {selectedDetail && <DetailedView details={selectedDetail} className="detailed-view" />}
        </div>
    );
}

export default App;
