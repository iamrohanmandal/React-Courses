import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize(s) {
    return s.toLowerCase().replace(/\b./g, function (a) {
      return a.toUpperCase();
    });
  }
  constructor(props) {
    super(props);
    console.log("Hello I am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `NewsMonkey-${this.capitalize(this.props.category)}`;
  }
  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log(data);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2942d87dbb2840149ada3f95bb0b66a1&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(data);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page +1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(data);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=2942d87dbb2840149ada3f95bb0b66a1&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    console.log("next");
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / this.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=2942d87dbb2840149ada3f95bb0b66a1&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    console.log("i am render");
    return (
      <>
        <h1 className="text-center " style={{ margin: "35px 0px" }}>
          NewsMonkey - Top Headlines on {this.capitalize(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    auhtor={element.auhtor}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
                
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-2 mx-2">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
