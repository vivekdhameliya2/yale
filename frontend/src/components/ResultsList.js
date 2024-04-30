import React from 'react';

const ResultsList = ({ results, onSelectDetail }) => {
    return (
        <div className="results-list">
            <ul>
                {results.map(result => (
                    <li key={result.id}>
                        <span>{result.id}</span>
                        <button onClick={() => onSelectDetail(result.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultsList;
