from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the PubMed API Server!"

@app.route('/api/search', methods=['POST'])
def search_publications():
    data = request.get_json()
    search_term = data.get('query')
    page = data.get('page', 1)
    items_per_page = data.get('items_per_page', 10)
    start = (page - 1) * items_per_page

    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    params = {
        'db': 'pubmed',
        'term': search_term,
        'retstart': start,
        'retmax': items_per_page,
        'retmode': 'json'
    }
    response = requests.get(base_url, params=params)
    if response.status_code != 200:
        return jsonify({'error': 'PubMed API error: ' + response.text}), response.status_code

    result_json = response.json()
    if 'esearchresult' not in result_json:
        return jsonify({'error': 'No search results found'})

    return jsonify(result_json)

@app.route('/api/details', methods=['GET'])
def get_details():
    ids = request.args.get('ids')
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
    params = {
        'db': 'pubmed',
        'id': ids,
        'retmode': 'xml'
    }
    response = requests.get(base_url, params=params)
    if response.status_code != 200:
        return jsonify({'error': 'PubMed API error: ' + response.text}), response.status_code

    root = ET.fromstring(response.text)
    details = []
    for article in root.iter('PubmedArticle'):
        detail = {
            'PMID': article.find('.//PMID').text,
            'Title': article.find('.//ArticleTitle').text,
            'Abstract': article.find('.//AbstractText').text,
            'AuthorList': ', '.join([author.find('.//LastName').text + ' ' + author.find('.//ForeName').text for author in article.findall('.//Author')]),
            'Journal': article.find('.//Title').text,
            'PublicationYear': article.find('.//PubDate//Year').text,
            'MeSHTerms': ', '.join([mesh.find('.//DescriptorName').text for mesh in article.findall('.//MeshHeading//DescriptorName')])
        }
        details.append(detail)

    return jsonify(details)

if __name__ == "__main__":
    app.run(debug=True)
