import React from 'react'
const NewsItem = (props) => {
    let { title, description, imageurl, newsUrl, author, date, source } = props;
    return (
      <div className='my-2'>
        <div className="card" >
          <div style={{
              display: 'flex', 
              justifyContent: 'flex-end', 
              position: 'absolute',
              right: '0'
            }}>
            <span class=" badge rounded-pill bg-danger" >{source}
            </span>
          </div>
          <img src={!imageurl ? "https://img.freepik.com/premium-vector/sport-science-runner_46706-926.jpg" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem




















