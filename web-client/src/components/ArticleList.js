import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';
import axios from 'axios';
import ArticleTable from './ArticleTable';
import Loader from './utils/Loader';
import Line from './utils/Line';
import firstUpper from './utils/firstUpper';

class ArticleList extends Component {
    constructor(){
        super();
        this.state = {
            query: '',
            articles: '',
            loading: false,
            title: 'COVID-19 Research Engine',
            searchable: ['Health', 'Treatment', 'Cure', 'Illness', 'Disease', 'SARS']
        };
    }

    componentDidMount () {
        let { keyword } = this.props.match.params;
        if (keyword) {
            this.setState({ query: keyword }, () => this.getAPI(keyword));
        }
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
        axios
            .get(`http://localhost:5000/search?query=${value}`)
            .then(res => {
                if (res.status == 200) {
                    this.updateArticles(res.data);
                }
            })
            .catch(err =>
                console.log(err)
            );
    }

    updateArticles = articles => {
        let updated_list = {}
        console.log(articles);

        Object.entries(articles).map(([keyword, data]) => {
            console.log(keyword, data);
            updated_list[keyword] = {};

            data.forEach(element => {
                let article_id = element.article.paper_id;

                let found = false;
                Object.keys(updated_list[keyword]).forEach(id => {
                    if (id == article_id) {
                        found = id;
                        //console.log('matching article')
                    }
                })

                if (found) {
                    updated_list[keyword][article_id].push(element)
                    //console.log('appending new article')
                } else {
                    updated_list[keyword][article_id] = [element]
                    //console.log('adding new article')
                }
            });

        });
        console.log(updated_list)
        this.setState({ articles: updated_list, loading: false });
    }

    resLength() {
        let { articles } = this.state;
        return Object.keys(articles).length;
    }

    render() {
        let { loading, query, articles, searchable, title } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col m12">
                        <h1 className="title center">{title}</h1>
                    </div>
                    <div className="col m2 m--25">
                        <div className="collection">
                            { searchable.map(value => <a href="#" onClick={() => this.onSearch(value, 'searchable')} className={`collection-item b-color ${value.toLowerCase() == query.toLowerCase() ? 'active' : ''}`}>{value}</a>)}
                        </div>
                    </div>
                    <div className="col m10 m-15">
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
                            ) : this.resLength() > 0 ? (
                                <div className="m-35">
                                    <h5 className="res-heading">{Object.keys(articles[Object.keys(articles)[0]]).length} {`Article${Object.keys(articles[Object.keys(articles)[0]]).length > 1 ? 's' : ''}`} found for "{query}"</h5>
                                    <Line/>
                                </div>
                            ) : query ? <p> No articles found for "{query}"</p> : (
                                <p className="info m-10 font-small">
                                    Search using a keyword, the engine will return the most relevant results among 200k scholar articles.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {this.resLength() > 0 ? <ArticleTable {...this.state} /> : null}
            </div>
        )
    }
}

export default ArticleList;