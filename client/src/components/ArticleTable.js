import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';

class ArticleTable extends Component {
    constructor(){
        super();
        this.state = {
            
        };
    }

    getSnippet = article => {
        let snippet = ''

        if (article.abstract.length > 0) {
            snippet = article.abstract[0]['text']
            console.log(1)
        } else {
            snippet = article.body[0]['text']
            console.log(2)
        }

        snippet = this.splitByWords(snippet);
        
        console.log(snippet)
        return snippet
    }

    splitByWords = snippet => {
        let words = snippet.split(' ')
        if (words.length > 20) {
            let cutOff = snippet.indexOf(words.slice(20).join(' ')) - 1;
            snippet = snippet.substring(0, cutOff) + '...';
        }
        return snippet;
    }

    splitBySentence = snippet => {
        let sentences = snippet.split('. ')
        if (sentences.length > 2) {
            let cutOff = snippet.indexOf(sentences[sentences.length - 1]) - 1;
            snippet = snippet.substring(0, cutOff);
            snippet += '..'
        }
        return snippet;
    }

    render() {
        let { query, articles } = this.props;
        return (
            <div className="row">
                <div className="col">
                    { articles.map((article, i) => {
                        return (
                            <div className={`row article-item ${i % 2 == 0 ? 'light-bg' : ''}`}>
                                <div className="col s11" key={article.paper_id}>
                                    <h5 className="article-title"> {article.title} </h5>
                                    <p className="article-text"> {this.getSnippet(article)} </p>
                                </div>
                                <div className="col s1 m-10">
                                    <Link to={{ pathname: `/article/${article.paper_id}`, state: { article, query } }}> <i className="small material-icons open_icon">open_in_new</i></Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ArticleTable;


/*

<table key={query} className="centered highlight">
                            <thead>
                                <tr>
                                    <th width='50%'> Snippet </th>
                                    <th width='40%'> Title </th>
                                    <th width='10%'> Article </th>
                                </tr>
                            </thead>
                            <tbody>

                            { articles.map(article => {
                                return (
                                    <tr key={article.paper_id}>
                                        <td> {this.getSnippet(article)} </td>
                                        <td> {article.title}</td>
                                        <td> <Link to={{ pathname: `/article/${article.paper_id}`, state: { article, query } }}> <i className="small material-icons">open_in_new</i></Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    */