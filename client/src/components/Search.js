import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';
import axios from 'axios';
import ArticleList from './ArticleList';
import Loader from './utils/Loader';
import Spinner from './utils/Spinner';
import Line from './utils/Line';
import firstUpper from './utils/firstUpper';
import InfiniteScroll from 'react-infinite-scroll-component';

class Search extends Component {

    constructor(){
        super();
        this.state = {
            query: '',
            articles: [],
            error: null,
            resultsLength: 5,
            loading: true,
            intervalId: 0,
            title: 'Coronavirus Research Engine',
            searchable: ['Health', 'Treatment', 'Cure', 'Illness', 'Disease', 'SARS', 'Drug discovery', 'Italy', 'China', 'Cough', 'Incubation']
        };
    }

    componentDidMount () {
        let { keyword } = this.props.match.params;
        if (keyword) {
            this.setState({ query: keyword }, () => this.getAPI(keyword));
        }
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
    
    onSearch = (e, f=false) => {
        let { query } = this.state;
        let value = '';

        if (f) {
            value = e.toLowerCase();
        } else {
            e.preventDefault();
            value = e.target.value.toLowerCase();
        }
        value = firstUpper(value.replace(/\s\s+/g, ' ').replace('.', ''));
        if (query == value) return false;

        this.setState({ query: value, loading: true }, value.length < 3 || isEmpty(value) ? null : () => this.getAPI(value));
    }

    getAPI = value => {
        let backend = ''
        if (window.location.hostname == 'localhost') {
            backend = 'http://localhost:5000';
        }

        axios
            .get(`${backend}/search?query=${value}`)
            .then(res => {
                if (res.status == 200) {

                    let resultsLength = 5;
                    let articles = res.data;

                    if (articles.length < 5)
                        resultsLength = articles.length

                    this.setState({ articles, resultsLength, loading: false });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: 'Server is down.' });
            });
    }

    // _updateArticles = articles => {
    //     let updated_list = {}
    //     console.log(articles);

    //     Object.entries(articles).map(([keyword, data]) => {
    //         console.log(keyword, data);
    //         updated_list[keyword] = {};

    //         data.forEach(element => {
    //             let article_id = element.article.paper_id;

    //             let found = false;
    //             Object.keys(updated_list[keyword]).forEach(id => {
    //                 if (id == article_id) {
    //                     found = id;
    //                     //console.log('matching article')
    //                 }
    //             })

    //             if (found) {
    //                 updated_list[keyword][article_id].push(element)
    //                 //console.log('appending new article')
    //             } else {
    //                 updated_list[keyword][article_id] = [element]
    //                 //console.log('adding new article')
    //             }
    //         });

    //     });
    //     console.log(updated_list)
    //     this.setState({ articles: updated_list, loading: false });
    // }

    render() {
        let { loading, query, error, articles, searchable, resultsLength, title } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col m12">
                        <h1 className="title center">{title}</h1>
                    </div>
                    <div className="col m2">
                        <div className="collection">
                            { searchable.map(value => <a href="#" onClick={() => this.onSearch(value, 'searchable')} className={`collection-item b-color ${value.toLowerCase() == query.toLowerCase() ? 'active' : ''}`}>{value}</a>)}
                        </div>
                    </div>
                    <div className="col m10 m-5">
                        <div className="col s12">
                            <nav className="b-btn">
                                <div className="nav-wrapper">
                                    <form onSubmit={e => e.preventDefault()}>
                                        <div className="input-field">
                                            <input className="input-search" id="search" value={query} onChange={this.onSearch} type="search" required/>
                                            <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                                            <i className="material-icons">close</i>
                                        </div>
                                    </form>
                                </div>
                            </nav>  
                        </div>
                        <div className="col s12">
                            { loading && !isEmpty(query) ? (
                                <Loader/>
                            ) : articles.length > 0 ? (
                                <div className="m-35">
                                    <h5 className="res-heading">Articles found relating to {query}</h5>
                                    <Line/>
                                    { articles.length > 0 ? (
                                        <InfiniteScroll
                                            dataLength={resultsLength}
                                            hasMore={resultsLength < articles.length}
                                            next={() => this.setState({ resultsLength: resultsLength + 5})}
                                            loader={<Spinner/>}
                                            endMessage={
                                                <div style={{textAlign: 'center'}}>
                                                    <button title='Back to top' className="btn-floating btn-large waves-effect waves-light b-btn" 
                                                        onClick={ () => { this.scrollToTop(); }}>
                                                            <i className="material-icons">keyboard_arrow_up</i>
                                                    </button>
                                                </div>
                                            }
                                            >
                                            <ArticleList {...this.state} articles={articles.slice(0, resultsLength)} />
                                        </InfiniteScroll>
                                    ) : null}
                                        
                                </div>
                            ) : !isEmpty(error) ? <p>{error}</p> : query ? <p> No articles found for "{query}"</p> : (
                                <p className="info m-10 font-small">
                                    Search using a keyword, the engine will return the most relevant results among 30k scholar articles.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;