import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import isEmpty from './utils/isEmpty';

class ArticleTable extends Component {
    constructor(){
        super();
        this.state = {
            
        };
    }

    render() {
        let { query, articles, loading } = this.props;
        let keyword = Object.keys(articles)[0];
        return (
                <div className="row">
                    <div className="col s12">
                        <table key={keyword} className="centered highlight">
                            <thead>
                                <tr>
                                    <th width='50%'> Snippet </th>
                                    <th width='40%'> Title </th>
                                    <th width='10%'> Article </th>
                                </tr>
                            </thead>
                            <tbody>

                            { Object.entries(articles[keyword]).map(([article_id, data]) => {
                                return data.map((item, i) => {
                                    let authors = item.article.authors.map((author, i) => `${author.first} ${author.last} ${i == 1 || i == item.article.authors.length - 1 ? '' : '- '}`);
                                    return (
                                        <tr className={`${i != data.length - 1 ? 'no-border' : ''}`} key={article_id + i}>
                                            <td>{item.sentence}</td>
                                            { i == 0 ? <> 
                                                <td> {item.article.title}</td>
                                                <td> <Link to={{ pathname: `/article/${item.article.paper_id}`, state: { data, keyword } }}> <i className="small material-icons">open_in_new</i></Link></td>
                                            </>
                                            : <> <td></td> <td></td> <td></td> </>}
                                        </tr>
                                    )
                                })
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ArticleTable;