from flask import Flask,request,jsonify,render_template
from flask_cors import CORS, cross_origin
from search import cleanText, buildIndex, searchArticles
import json

size = '1k'
articles = json.load(open(f'./data/articles_{size}.json', 'rb'))
tokenized_corpus = json.load(open(f'./data/tokenized_corpus_{size}.json', 'rb'))

bm25_index = buildIndex(tokenized_corpus)
print('Created index')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return 'test API'

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    query = cleanText(query)
    print(query)

    n = 5

    res = searchArticles(bm25_index, tokenized_corpus, articles, query, n)
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)