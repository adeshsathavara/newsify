import React, { Component } from "react";
import placeholder from "../assets/images/placeholder.jpg";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class FeaturedNews extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    document.title = `Newsify - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  async updateNews() {
    this.props.setProgress(0);
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=744ce605621e42638bccea21b044b5b1&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    this.setState({
      loading: true,
    });
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=744ce605621e42638bccea21b044b5b1&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    this.setState({
      loading: true,
    });
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <section className="my-5">
        {this.state.loading && <Loader />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                const formattedDate = new Date(
                  element.publishedAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={
                          element.urlToImage ? element.urlToImage : placeholder
                        }
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <span>{formattedDate}</span>
                        <h5 className="card-title">{element.title}</h5>
                        <p className="card-text">{element.description}</p>
                        <a
                          href={element.url}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </section>
    );
  }
}
