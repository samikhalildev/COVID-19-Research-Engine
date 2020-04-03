from flask import Flask,request,jsonify,render_template
from utils import cleanText, search_articles
from flask_cors import CORS, cross_origin
import json

articles = json.load(open('./data/articles.json', 'rb'))

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
    query = query.split(',')
    print(query)
    res = search_articles(articles, query)
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)