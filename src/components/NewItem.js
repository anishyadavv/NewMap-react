import React, { Component } from 'react'

export class NewItem extends Component {

  

  render() {
    let {title, description, imageUrl, newsUrl,auther,date} = this.props;
    return (
      <div className="my-3">
        <div className="card">
            <img src={!imageUrl?"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/03/breaking-1615682814.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title?title:""}</h5>
                <p className="card-text">{description?description:""}</p>
                <p className="card-text"><small className="text-muted">By {!auther?"anonymous":auther} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-primary">Read</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewItem
