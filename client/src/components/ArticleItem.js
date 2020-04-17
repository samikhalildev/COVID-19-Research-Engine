import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';
import Line from './utils/Line';

class ArticleItem extends Component {
    constructor(){
        super();
        this.state = {
            article: {},
            query: '',
            intervalId: 0
        };
    }

    componentDidMount () {
        const { article, query } = this.props.location.state;

        if (article && Object.keys(article).length > 0)
            this.setState({ article, query });
        else
            this.props.history.push('/')
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    isSent(data, type, i , text) {
        return data.filter(article => article.sectionType == type && article.paraIndex == i && text.indexOf(article.sentence) != -1)
    }

    getAllOccurrences(text, keyword){
        var a=[],i=-1;
        while((i=text.indexOf(keyword,i+1)) >= 0) a.push(i);
        return a;
      }

    isKeywordInText = (text, keyword) => {
        let i = -1;
        let arr = [];
        keyword = keyword.toLowerCase()

        while((i=text.indexOf(keyword,i+1)) >= 0) {
            arr.push(i)
        }

        return arr;
    }

    // renderBody = (paragraph) => {
    //     const { query } = this.state;
    //     let foundKeywordIndexs = this.isKeywordInText(paragraph, query);

    //     return (
    //         <p>
    //             { foundKeywordIndexs.length > 0 ? paragraph.map((word) => {
    //                 return (
    //                     <>
    //                         {paragraph.substr(0, index)}
    //                         <span className="g-color">{paragraph.substr(index, index + query.length)}</span>
    //                         {paragraph.substr(index + query.length)}
    //                     </>
    //                 )}
    //             ) : paragraph
    //             }
    //         </p>
    //     )
    // }

    wordsCount = text => {
        return text.trim().length > 0 ? text.trim().split(' ').length : 0
    }

    render() {
        let { article, query } = this.state;

        console.log(article)

        return (
            <div className="container m-50 mb-75">
                <div className="back-btn">
                    <Link to={`/${query}`} className="btn-floating btn-large waves-effect waves-light b-btn"><i className="material-icons">keyboard_backspace</i></Link>
                </div>
                { Object.keys(article).length > 0 ? (
                    <>
                        <h4 className="title">{article.title}</h4>
                        <div className="col s12 center m-25 offset-m2 l6 offset-l3">
                            <div className="card-panel grey lighten-5 z-depth-1">
                                <span className="black-text">
                                    { article.authors.length ? <i> Authors: {' '} {article.authors.join(', ')} </i> : null}
                                </span>
                            </div>
                        </div>
                        <Line showRed={true} />

                        { article.summary.length ? (
                            <div className="m-50">
                                <h4>Summary</h4>
                                <p>{article.summary}</p>
                            </div>
                        ): null }
                        
                        { article.abstract.length && article.abstract[0].text && this.wordsCount(article.abstract[0].text) > 10 ? (
                            <div className="abstract m-50">
                                <h4>Abstract</h4>
                                {article.abstract.map((t, i) => {
                                    return <p>{t.text}</p>
                                })}
                            </div>
                        ) : null }

                        <article className="m-50">
                            {article.body.map((t, i) => {

                                let { section, text } = t;
                                
                                if (this.wordsCount(text) > 10) {
                                    return (
                                        <>
                                            <h5 className="section">{section}</h5>
                                            <p>{text}</p>
                                        </>
                                    )
                                }

                                // let foundArticles = this.isSent(data, 'body', i, t.text)
                                // if (foundArticles.length > 0) {
                                    
                                //     let sentences = t.text.split('. ');
                                    
                                //     html.push(<p>
                                //         { sentences.map((sentence, index) => {
                                //             let lastCharIsSpace = sentence.substr(sentence.length - 1) == ' ';
                                //             return <span className={(foundArticles.filter(article => article.sentIndex == index)).length > 0 ? 'g-color' : ''}> {`${lastCharIsSpace ? sentence.substr(0, sentence.length - 1) : sentence}.`}</span>
                                //         })}
                                //     </p>)
                                // } else { 
                                // }
                            })}
                        </article>
                    </>
                ) : (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                )}
                <div className="m-50 center">
                    <button title='Back to top' className="btn-floating btn-large waves-effect waves-light b-btn" 
                        onClick={ () => { this.scrollToTop(); }}>
                            <i className="material-icons">keyboard_arrow_up</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default ArticleItem;

//<a className="btn-floating pulse b-btn"><i className="material-icons">expand_more</i></a>

//let startIndex = foundArticles.map(article => t.text.indexOf(article.sentence))
//let endIndex = startIndex + foundArticles.sentence.length;
//t.text = t.text.substring(t.text.indexOf(sentences[sentIndex-2]), sentences[t.sentIndex])