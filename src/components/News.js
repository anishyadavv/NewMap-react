import React, { Component } from 'react'
import Spinner from './Spinner';
import NewItem from './NewItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps={
        country:'in',
        category:'entertainment',
        pageSize:8
    }
    static propTypes={
        country:PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props){
        super(props);    
        console.log("This is constructor of News component");
        this.state={
            articles:[],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title = `${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} - NewMap`;
    }
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f52cf3fe2fd2413b8675671bc2bcc1cb&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
    }
    handleNextPage= async()=>{

        
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f52cf3fe2fd2413b8675671bc2bcc1cb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({
                loading:true
            })
            let data = await fetch(url);
            
            let parsedData = await data.json()
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: true
            })
        
        
    }
    handlePreviousPage=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f52cf3fe2fd2413b8675671bc2bcc1cb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({
            loading:true
        })
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({articles: parsedData.articles, page:this.state.page-1, loading:false});
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f52cf3fe2fd2413b8675671bc2bcc1cb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`   
        let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page+1,
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
      };
  render() {
    return (
      <>
        <h2 className="text-center">Top - Headlines on {(this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)==='General')?"NewMap":this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)}</h2>
         {this.state.loading && <Spinner/>}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        
        <div className="row">
           {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} auther = {element.author} date={element.publishedAt}/>
                </div>
            })}
            
        </div>
        </div> 

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between m-4">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousPage}>&larr; Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
