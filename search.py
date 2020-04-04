from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.cluster.util import cosine_distance
from nltk.tokenize import word_tokenize, sent_tokenize
from rank_bm25 import BM25Okapi
import re

def cleanText(text):
    text = text.strip().lower()
    return text

def tokenizeArticles(articles):
    tokenized_corpus = []

    for article in articles:
        article_id = article['paper_id']
        abstract = article['abstract']
        body = article['body']

        paragraph = ''

        if len(abstract) > 0:
            paragraph = abstract[0]['text']
        else:
            paragraph = body[0]['text']

        tokenized_words = preProcess(article_id, paragraph)
        tokenized_corpus.append(tokenized_words)
        
    return tokenized_corpus

def preProcess(article_id, paragraph):
    
    # Removing stop words
    stop_words = set(stopwords.words("english"))
    
    # Remove special characters
    paragraph = re.sub('\(|\)|:|,|;|\.|’|”|“|\?|%|>|<', '', paragraph)
    paragraph = re.sub('/', ' ', paragraph)
    paragraph = paragraph.replace("'",'')

    # Tokenize paragraph
    paragraph = word_tokenize(paragraph.lower())
    
    # filter out stop words
    words = [word.strip() for word in paragraph if word not in stop_words and len(word.strip()) > 2]
    words.insert(0, article_id)
    
    return words

def buildIndex(tokenized_corpus):
    return BM25Okapi(tokenized_corpus)

def searchArticles(bm25, tokenized_corpus, articles, query, n):
    query = query.split(' ')
    
    doc_scores = bm25.get_scores(query)
    results = bm25.get_top_n(query, tokenized_corpus, n=n)

    return getArticles(articles, results)

def getArticles(articles, results):
    result_articles = []

    for words in results:
        article_id = words[0]
        sentences = ' '.join(words[1:])

        for article in articles:
            if article_id == article['paper_id']:
                result_articles.append(article)
                break

    return result_articles