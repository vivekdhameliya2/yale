import React from 'react';

const ResultsList = ({ results, onSelectDetail }) => {
    return (
        <div>
            <ul className="results-list">
                {results.map(result => (
                    <li key={result.id} onClick={() => onSelectDetail(result.id)} className="result-item">
                        <span><strong>ID:</strong> {result.id}</span>
                        <span><strong>Title:</strong> {result.title || 'N/A'}</span>
                        <span><strong>Year:</strong> {result.year || 'N/A'}</span>
                        {result.webpage && (
                            <a href={result.webpage} target="_blank" rel="noopener noreferrer">View Webpage</a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsList;
