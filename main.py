from utils import getText, search_articles, getSentences
import json
import os
articles = json.load(open('./data/articles.json', 'rb'))

print('Search for any query')
print("Add a ',' between words to search for more queries")
print('Add a space between words to search for it')
while True:
    query = input('Search: ')
    query = query.split(',')

    searchIndex = search_articles(articles, query)
    
    print(len(searchIndex.keys()))
    for key, value in searchIndex.items():
        print(f'{key}: {value[:2]}')
