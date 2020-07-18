import React, {Component} from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import Line from './utils/Line';
import { Article, Text } from '../interfaces/Article'

interface State {
    article: Article;
    query: string;
    intervalId: NodeJS.Timeout;
}

interface Props extends RouteComponentProps<any> {
    scrollStepInPx: number;
    delayInMs: number;
    location: any
}

class ArticleItem extends Component<Props, State> {

    componentWillMount () {
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

    isKeywordInText = (text: string, keyword: string) => {
        let i = -1;
        let arr = [];
        keyword = keyword.toLowerCase()

        while((i=text.indexOf(keyword,i+1)) >= 0) {
            arr.push(i)
        }

        return arr;
    }

    wordsCount = (text: string) => {
        return text.trim().length > 0 ? text.trim().split(' ').length : 0
    }

    render() {
        let { article, query } = this.state;
        let previousSection = '';

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
                                {article.abstract.map((t: Text) => {
                                    return <p>{t.text}</p>
                                })}
                            </div>
                        ) : null }

                        <article className="m-50">
                            {article.body.map((t: Text, i: number) => {

                                let { section, text } = t;
                                let html = [];
                                
                                if (section.trim().length > 5 && i === 0 || previousSection != section) {
                                    previousSection = section;
                                    html.push(<h5 className="section">{section}</h5>)
                                }
                                
                                if (this.wordsCount(text) > 10) {
                                    html.push(<p>{text}</p>)
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