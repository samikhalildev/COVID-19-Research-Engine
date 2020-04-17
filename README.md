# COVID-19-Research-Engine
This project is made for the CORD-19 Kaggle challenge.
https://www.kaggle.com/samidev/coronavirus-research-engine

Using the dataset provided, I have developed a search engine that responds to querys and returns the most relevant articles long with a summary of the main points.

The application is hosted using Flask web server and React as a front-end framework. Due to file upload limit, the app is currently only responding to 1000 articles.

The index and summary of all articles are cached in seperate JSON files to help return the most relevant results quickly.

Live demo: https://c-ovid-19.technology

BM250kapi was used to build an index/corpus of the data as well as nltk features to clean the data, remove stop words, tokenize and calculate sentences score to produce a summary from the article.

## Server installation
1. Add dependenices
    ```pip3 install -r requirements.txt```
2. Run Flask server
    ```python3 run.py```
3. View in browser on: http://127.0.0.1:5000/
Note: Flask will also serve the front-end
