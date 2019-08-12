import React from 'react';
import './App.css';
import axios from 'axios';
import News from './components/News';
import ReadNews from './components/ReadNews';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            news: [],
            page: 1,
            totalPages: null,
            scrolling: false,
            readNews: null,
            newNewsId: null
        }
    }

    componentDidMount() {
        this.loadNews()
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })

    }
    componentDidUpdate(nextProps, nextState, nextContext) {
        localStorage.setItem("allNews", JSON.stringify(this.state.news))

        const storedPageTitle = JSON.parse(localStorage.getItem('currentNewsTitle'))
        const currentPageTitle = this.state.news[0].webTitle

        this.interval = setInterval(() => {
            localStorage.setItem('currentNewsTitle', JSON.stringify(currentPageTitle))

            if(storedPageTitle !== currentPageTitle){
                alert("New News For You!")
                localStorage.setItem('currentNewsTitle', JSON.stringify(currentPageTitle))
            }
        }, 30000);


    }
    UNSAFE_componentWillMount() {
        const readNews = JSON.parse(localStorage.getItem('readNews'))
        this.setState({
            readNews: readNews
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleScroll = (e) => {
        const { scrolling, totalPages, page } = this.state
        if(scrolling) return
        if(totalPages <= page) return
        const lastNews = document.querySelector('div.news-all > div.news__box:last-child')
        if(lastNews) {
            const lastNewsOffset = lastNews.offsetTop + lastNews.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            let bottomOffset = 10
            if(pageOffset > lastNewsOffset - bottomOffset) this.loadMore()
        }
    }

    loadNews = () => {
        const { page, news } = this.state
        const API_KEY = "124505e0-8351-46ff-bb44-d3f4d14ec4ea"
        const URL = `https://cors-anywhere.herokuapp.com/http://content.guardianapis.com/sport?edition=uk&show-fields=all
        &page=${page}&api-key=${API_KEY}`

        axios.get(URL)
            .then(res => {
                const data = res.data.response.results
                const totalPages = res.data.response.total
                this.setState({
                    news: [...news, ...data],
                    scrolling: false,
                    totalPages: totalPages,
                    page: this.state.page,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling: true
        }), this.loadNews)
    }


    render() {
        return (
            <div className="App">
                <div>
                    <ReadNews readNews={this.state.readNews} />
                </div>
                <div className="container">
                    <div>
                        <News
                            news={this.state.news}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;