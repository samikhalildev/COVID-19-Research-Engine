from flask import Flask, request, jsonify, render_template, Blueprint, redirect, url_for
from flask_cors import CORS, cross_origin
from urllib.parse import urlparse
from app.search import cleanText, buildIndex, searchArticles
import json

size = '1k'
articles = json.load(open(f'./data/articles_{size}.json', 'rb'))
tokenized_corpus = json.load(open(f'./data/tokenized_corpus_{size}.json', 'rb'))

bm25_index = buildIndex(tokenized_corpus)
print('Created index')

index_view = Blueprint("index", __name__)
search_api = Blueprint("search", __name__)

def createApp():
    app = Flask(__name__.split('.')[0], static_folder='../client/build/static', template_folder="../client/build")
    CORS(app)
    app.url_map.strict_slashes = False
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.register_blueprint(index_view)
    app.register_blueprint(search_api)
    return app

@index_view.route('/', defaults={'u_path': ''})
@index_view.route('/<path:u_path>')
def index(u_path):
    url = urlparse(request.base_url)
    host = url.hostname
    print(host)
    if host == 'c-ovid-19.technology':
        return redirect("https://coronavirus-research.herokuapp.com", code=302)
    else:
        return render_template('index.html')

@search_api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    query = cleanText(query)
    print(query)

    res = searchArticles(bm25_index, tokenized_corpus, articles, query, 30)
    return jsonify(res)