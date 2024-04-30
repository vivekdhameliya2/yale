import React from 'react';

function ResultsList({ results, onSelectDetail }) {
    return (
        <ul>
            {results.map(result => (
                <li key={result.id} onClick={() => onSelectDetail(result.id)}>
                    Article ID: {result.id}
                </li>
            ))}
        </ul>
    );
}

export default ResultsList;