import React from 'react';

function DetailedView({ result }) {
  return (
    <div>
      <h2>{result.title}</h2>
      <p>{result.abstract}</p>
      <p>Authors: {result.authors}</p>
      <p>Journal: {result.journal}</p>
      <p>Publication Year: {result.year}</p>
      <a href={result.externalLink}>View on PubMed</a>
    </div>
  );
}

export default DetailedView;
