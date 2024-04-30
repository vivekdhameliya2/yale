import React from 'react';
import '../styles.css';

function DetailedView({ details }) {
    if (!details) return <div className="detailed-view">No detail data available.</div>;

    return (
        <div className="detailed-view">
            <h3 className="detail-heading">Publication Details</h3>
            <div className="detail-item">
                <strong>Title:</strong> {details.Title !== "N/A" ? details.Title : "Title not available"}
            </div>
            <div className="detail-item">
                <strong>Abstract:</strong> {details.Abstract !== "N/A" ? details.Abstract : "Abstract not available"}
            </div>
            <div className="detail-item">
                <strong>Authors:</strong> {details.AuthorList !== "N/A" ? details.AuthorList : "Author list not available"}
            </div>
            <div className="detail-item">
                <strong>Journal:</strong> {details.Journal !== "N/A" ? details.Journal : "Journal information not available"}
            </div>
            <div className="detail-item">
                <strong>Year:</strong> {details.PublicationYear !== "N/A" ? details.PublicationYear : "Publication year not available"}
            </div>
            <div className="detail-item">
                <strong>MeSH Terms:</strong> {details.MeSHTerms !== "N/A" ? details.MeSHTerms : "MeSH terms not available"}
            </div>
            <div className="detail-item">
                <strong>PMID:</strong> {details.PMID !== "N/A" ? details.PMID : "PMID not available"}
            </div>
        </div>
    );
}

export default DetailedView;
