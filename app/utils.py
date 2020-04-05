import json

def getText(x):
    text = []
    for t in x:
        text.append(t['text'])
        
    text = ''.join(text)
    return text

def getSentences(text):
    sentences = []
    if len(text) > 0:
        if '. ' in text:
            for sentence in text.split('. '):
                sentence = sentence.strip()
                if len(sentence) > 3:
                    sentences.append(sentence)
        else:
            if len(text) > 3:
                sentences.append(text)
    return sentences

def lastElement(i, arr):
    return i == len(arr) - 1

def old_search_function(articles, query):
    searchIndex = {}
    
    for article in articles[:5]:
        counter = 0

        while counter != 2:
            sectionType = 'abstract' if counter == 0 else 'body'
            
            for i in range(len(article[sectionType])):
                paragraph = article[sectionType][i]

                text = paragraph['text']
                section = paragraph['section']
                
                sentences = text.split('. ')
                
                for j in range(len(sentences)):
                    sentence = sentences[j]
                    for term in query:
                        if term in sentence.lower():
                            ob = {'sentence': sentence, 'article': article, 'sectionType': sectionType, 'paraIndex': i, 'sentIndex': j}
                            if term in searchIndex:
                                searchIndex[term].append(ob)
                            else:
                                searchIndex[term] = [ob]
            counter += 1
            
    return searchIndex            

# query = ['Heath', 'Treatment', 'Cure', 'Virus']
# searchIndex = old_search_function(articles, query)
# if len(data):
#     for key in searchIndex.keys():
#         dic = {}
#         for item in searchIndex[key][:1]:
#             print(key)
#             print(item['article']['title'])
#             if key in item['article']['title'].lower():
#                 print('wo')

# with open('tokenized_corpus_30k.json', 'w', encoding='utf-8') as f:
#     json.dump(tokenized_corpus, f, ensure_ascii=False, indent=4)