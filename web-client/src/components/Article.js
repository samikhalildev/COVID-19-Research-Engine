import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';
import Line from './utils/Line';

class Article extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            keyword: ''
        };
    }

    componentDidMount () {
        const { id } = this.props.match.params
        const { data, keyword } = this.props.location.state;

        if (id && data && data.length > 0)
            this.setState({ data, keyword });
        else
            this.props.history.push('/')
    }


    isSent(data, type, i , text) {
        return data.filter(article => article.sectionType == type && article.paraIndex == i && text.indexOf(article.sentence) != -1)
    }

    render() {
        let { data, keyword } = this.state;
        let item = '';
        let previousSection = '';

        if (data.length > 0)
            item = data[0];

        return (
            <div className="container m-50 mb-75">
                <div className="back-btn">
                    <Link to={`/${keyword}`} className="btn-floating btn-large waves-effect waves-light b-btn"><i className="material-icons">keyboard_backspace</i></Link>
                </div>

                { data.length > 0 ? (
                    <>
                        <h4 className="title">{item.article.title}</h4>
                        <div className="col s12 center m-25 offset-m2 l6 offset-l3">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                <span className="black-text">
                                    <i> Authors: {' '} {item.article.authors.join(', ')} </i>
                                </span>
                            </div>
                        </div>
                        <Line showRed={true} />
                        <div className="abstract m-50">
                            <h4>Abstract</h4>
                            {item.article.abstract.map((t, i) => {
                                let foundArticles = this.isSent(data, 'abstract', i, t.text)
                                if (foundArticles.length > 0) {
                                    let sentences = t.text.split('. ');
                                    return <p>
                                        { sentences.map((sentence, index) => {
                                            let lastCharIsSpace = sentence.substr(sentence.length - 1) == ' ';
                                            return <span className={(foundArticles.filter(article => article.sentIndex == index)).length > 0 ? 'g-color' : ''}> {`${lastCharIsSpace ? sentence.substr(0, sentence.length - 1) : sentence}.`}</span>
                                        })}
                                    </p>
                                }
                                return <p>{t.text}</p>
                            })}
                        </div> 

                        <article className="m-50">
                            {item.article.body.map((t, i) => {
                                let html = [];

                                let {section} = t;

                                if (i === 0 || previousSection != section) {
                                    previousSection = section;
                                    html.push(<h5 className="section">{section}</h5>)
                                }

                                let foundArticles = this.isSent(data, 'body', i, t.text)
                                if (foundArticles.length > 0) {
                                    
                                    let sentences = t.text.split('. ');
                                    
                                    html.push(<p>
                                        { sentences.map((sentence, index) => {
                                            let lastCharIsSpace = sentence.substr(sentence.length - 1) == ' ';
                                            return <span className={(foundArticles.filter(article => article.sentIndex == index)).length > 0 ? 'g-color' : ''}> {`${lastCharIsSpace ? sentence.substr(0, sentence.length - 1) : sentence}.`}</span>
                                        })}
                                    </p>)
                                } else { 
                                    html.push(<p>{t.text}</p>)
                                }
                                
                                return html
                            })}
                        </article>
                    </>
                ) : (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                )}
            </div>
        )
    }
}

export default Article;

//<a className="btn-floating pulse b-btn"><i className="material-icons">expand_more</i></a>

//let startIndex = foundArticles.map(article => t.text.indexOf(article.sentence))
//let endIndex = startIndex + foundArticles.sentence.length;
//t.text = t.text.substring(t.text.indexOf(sentences[item.sentIndex-2]), sentences[t.sentIndex])