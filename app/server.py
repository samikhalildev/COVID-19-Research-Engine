from flask import Flask,request,jsonify,render_template, Blueprint
from flask_cors import CORS, cross_origin
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
    return render_template('index.html')

@search_api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    query = cleanText(query)
    print(query)

    n = 5

    res = searchArticles(bm25_index, tokenized_corpus, articles, query, n)
    return jsonify(res)