import React, { useEffect ,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {

const [articles , setArticles] = useState([])
const [loading , setLoading] = useState(true)
const [page, setPage] = useState(1);
const [totalResults, settotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // let url = "https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8749a7c4d30d471db3cce149cd26d617&page=1&pageSize=";
  // let url = "https://newsapi.org/v2/top-headlines?country=${props.country}&category=technology&category=${props.category}&apiKey=8749a7c4d30d471db3cce149cd26d617";
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8749a7c4d30d471db3cce149cd26d617&page=${this.state.page}&pageSize=${props.pageSize}`;

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `NewsT-${capitalize(props.category)}`;
    updateNews();
     // eslint-disable-next-line
  },[])

   const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8749a7c4d30d471db3cce149cd26d617&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page +1 )
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };


    return (

      <div>
        <h1 className="text-center" style={{marginTop: "60px" }}>
          NewsT - Top  {capitalize(props.category)} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsUrl=
                  {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
          </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </div>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',

}
News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
