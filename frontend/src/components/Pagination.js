import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
