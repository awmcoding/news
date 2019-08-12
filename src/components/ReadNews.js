import React from 'react';
import {Link} from "react-router-dom";

const ReadNews = props => {
    if(props.readNews !== null){
        return (
            <div className="all-read-news">
                { props.readNews.map((singleNews, index) => {
                    return (
                        <div key={index} className="news__box">
                            <img className="news__box-img" src={singleNews} alt="" />
                            <div className="news__text">
                                <h5 className="news__title">
                                    {singleNews.webTitle.length < 20 ? `${singleNews.webTitle}` :
                                        `${singleNews.webTitle.substring(0, 25)}...`}
                                </h5>
                                <p className="news__subtitle">Category <span>
                                    { singleNews.sectionName }
                                </span></p>
                                <div key={index}>
                                    <div className="news__button">
                                        <Link to={{ pathname: `/news/${index}`,
                                            state: {singleNews: index}
                                        }}>View News</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                }) }
            </div>
        )
    }else{
        return (
            <div className="notes">
                <h2 className="section__title">News From Live API</h2>
                <h5> Dear SoloLearn Team!</h5>
                <p>

                    <p>I'm currently learning REACTJS, and this is my firs project</p>
                    some notes for missing parts :)
                    <ul>
                        <li>I can't get images and description :(</li>
                        <li>API item ID's is not unique, because I have used custom ID, and sometimes used title.</li>
                    </ul>

                </p>
            </div>
        )
    }

}

export default ReadNews;
