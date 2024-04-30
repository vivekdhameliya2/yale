import React from 'react';

function DetailedView({ details }) {
    if (!details) return <div>No detail data available.</div>;

    return (
        <div>
            <h3>Publication Details</h3>
            <p><strong>Title:</strong> {details.Title !== "N/A" ? details.Title : "Title not available"}</p>
            <p><strong>Abstract:</strong> {details.Abstract !== "N/A" ? details.Abstract : "Abstract not available"}</p>
            <p><strong>Authors:</strong> {details.AuthorList !== "N/A" ? details.AuthorList : "Author list not available"}</p>
            <p><strong>Journal:</strong> {details.Journal !== "N/A" ? details.Journal : "Journal information not available"}</p>
            <p><strong>Year:</strong> {details.PublicationYear !== "N/A" ? details.PublicationYear : "Publication year not available"}</p>
            <p><strong>MeSH Terms:</strong> {details.MeSHTerms !== "N/A" ? details.MeSHTerms : "MeSH terms not available"}</p>
            <p><strong>PMID:</strong> {details.PMID !== "N/A" ? details.PMID : "PMID not available"}</p>
        </div>
    );
}

export default DetailedView;