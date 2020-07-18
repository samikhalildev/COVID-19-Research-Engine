import React from 'react'
import { Link } from 'react-router-dom';
import { Article } from '../interfaces/Article'
import { getSnippet, splitByWords, splitBySentence } from './utils/articleHelpers';

interface Props {
    query: string;
    articles: Array<Article>;
}

const ArticleList: React.FC<Props> = ({ query, articles }) => {

    return (
        <div className="row">
            <div className="col">
                {articles.map((article: Article, i: number) => {
                    return (
                        <div className={`row article-item ${i % 2 == 0 ? 'light-bg' : ''}`}>
                            <div className="col s11" key={article.paper_id}>
                                <Link to={{ pathname: `/article/${article.paper_id}`, state: { article, query } }}>
                                    <h5 className="article-title"> {splitByWords(article.title, 20)} </h5>
                                </Link>
                                <p className="article-text"> {getSnippet(article)} </p>
                            </div>
                            <div className="col s1 m-10">
                                <Link to={{ pathname: `/article/${article.paper_id}`, state: { article, query } }}> <i className="small material-icons open_icon">open_in_new</i></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ArticleList;