from utils import getText, search_articles, getSentences
import json
import os
articles = json.load(open('./data/data_structure.json', 'rb'))

# searchTerms = ['health', 'improvement', 'prevention', 'cure', 'sick', 'illness', 'recovery', 'injury', 'diagnosis', 'treatment']
# searchIndex = search(searchTerms)
# print(len(searchIndex))

# if len(searchIndex):
#     for key in searchIndex.keys():
#         print(key, len(searchIndex[key]))

# for m in searchIndex['improvement']:
#     section = m['sectionType']
#     i = m['paraIndex']
#     print(m['sentence'])
#     print(m['article'][section][i]['text'].split('. ')[m['sentIndex']])


print('Search for any query')

while True:
    query = input('Search: ')
    res = search_articles([query])
    for key, value in res.items():
        print(f'{key}: {value[0]["sentence"]}')
