import React from 'react';

import {Link} from 'react-router-dom';
import axios from "axios";

class SingleNews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeNews: [],
        }
    }

    componentDidMount() {
        const index = this.props.location.state.singleNews
        const API_KEY = "124505e0-8351-46ff-bb44-d3f4d14ec4ea"
        const URL = `https://cors-anywhere.herokuapp.com/http://content.guardianapis.com/sport?edition=uk&show-fields=all&api-key=${API_KEY}`
        axios.get(URL)
            .then(res => {
                const data = res.data.response.results
                this.setState({
                    activeNews: data[index%10],
                });

                const activeNews = data[index%10]

                    let a = [];
                    a.push(activeNews)

                    const readNews = JSON.parse(localStorage.getItem('readNews'))
                    if(readNews == null){
                        localStorage.setItem('readNews', JSON.stringify(a));
                    }else{
                        readNews.push(activeNews)
                        localStorage.setItem('readNews', JSON.stringify(readNews));
                    }
            })
    }


    render(){
        const singleNews = this.state.activeNews
        return(
            <div className="container">
                { this.state.activeNews.length !== 0 &&
                    <div className="active-news">
                        <h3 className="active-news__title">{singleNews.webTitle}</h3>

                        <img className="active-news__img" src={singleNews.fields.thumbnail} alt={singleNews.title} />
                        <h4 className="active-news__publisher">
                            Category: <span>{singleNews.sectionName}</span>
                        </h4>
                        <div className="active-news__button">
                            <Link to="/">Go Home</Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default SingleNews;