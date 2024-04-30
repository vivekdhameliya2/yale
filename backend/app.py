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

    return jsonify(result_json['esearchresult'])

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

    try:
        root = ET.fromstring(response.text)
        details = []
        for article in root.iter('PubmedArticle'):
            authors = article.findall('.//Author')
            author_list = [author.find('.//LastName').text + ' ' + author.find('.//ForeName').text for author in authors if author.find('.//LastName') and author.find('.//ForeName')]
            mesh_terms = [mesh.find('.//DescriptorName').text for mesh in article.findall('.//MeshHeading//DescriptorName') if mesh.find('.//DescriptorName')]
            detail = {
                'PMID': article.find('.//PMID').text if article.find('.//PMID') else 'N/A',
                'Title': article.find('.//ArticleTitle').text if article.find('.//ArticleTitle') else 'N/A',
                'Abstract': ' '.join([ab.text for ab in article.findall('.//AbstractText') if ab.text]) if article.find('.//Abstract') else 'N/A',
                'AuthorList': ', '.join(author_list) if author_list else 'N/A',
                'Journal': article.find('.//Title').text if article.find('.//Title') else 'N/A',
                'PublicationYear': article.find('.//PubDate//Year').text if article.find('.//PubDate//Year') else 'N/A',
                'MeSHTerms': ', '.join(mesh_terms) if mesh_terms else 'N/A'
            }
            details.append(detail)

        return jsonify(details)
    except ET.ParseError as e:
        return jsonify({'error': 'Failed to parse PubMed response: ' + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
