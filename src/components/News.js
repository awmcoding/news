import React from 'react';

import { Link } from 'react-router-dom';
// import OpenedNews from './OpenedNews';


class News extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeNews: [],
            clicked: {}
        }
    }

    render(){
        return(
            <div className="news-all">
                { this.props.news.map((singleNews, index) => {
                    return (
                        <div key={index} className="news__box" style={{marginBottom: "2rem"}}>
                            <img className="news__box-img" src="https://media.guim.co.uk/47b97e8ea25ddb7b8ea7f86deb40a577b26d5b11/0_89_3552_2132/500.jpg" alt="" />
                            <div className="news__text">
                                <h5 className="news__title">{singleNews.webTitle}</h5>
                                <p className="news__subtitle"><strong>Category:</strong> <span>
                                    { singleNews.sectionName }
                                </span></p>
                                <div className="news__button">
                                    <Link to={{ pathname: `/news/${index}`,
                                        state: {singleNews: index}
                                    }}>View News</Link>
                                </div>
                            </div>
                        </div>
                    )

                }) }
            </div>
        )
    }
}

export default News;