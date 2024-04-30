import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import Pagination from './components/Pagination';
import DetailedView from './components/DetailedView';
import axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState('');

  const handleSearch = async (query, page = 1) => {
    try {
      const response = await axios.post('http://localhost:5000/api/search', {
        query,
        page,
        items_per_page: 10
      });
      setResults(response.data['esearchresult']['idlist']);
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.data['esearchresult']['count'] / 10));
      setLastSearchQuery(query);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    handleSearch(lastSearchQuery, newPage);
  };

  const handleResultClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/details?ids=${id}`);
      setSelectedResult(response.data);
    } catch (error) {
      console.error('Failed to fetch details:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ResultsList results={results} onSelect={handleResultClick} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {selectedResult && <DetailedView result={selectedResult} />}
    </div>
  );
}

export default App;
