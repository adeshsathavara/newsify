import React, { Component } from "react";
import placeholder from "../assets/images/placeholder.jpg";
import Loader from "./Loader";
import PropTypes from "prop-types";

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

    document.title = `Newsify - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async updateNews() {
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=744ce605621e42638bccea21b044b5b1&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    this.setState({
      loading: true,
    });
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <section className="my-5">
        {this.state.loading && <Loader />}
        <div className="container">
          <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element, index) => {
              const formattedDate = new Date(
                element.publishedAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card" >
                    <img src={ element.urlToImage ? element.urlToImage : placeholder} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <span>{formattedDate}</span>
                      <h5 className="card-title">{element.title}</h5>
                      <p className="card-text">{element.description}</p>
                      <a href={element.url} className="btn btn-primary" target="_blank">Read More</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <button
                disabled={this.state.loading || this.state.page <= 1}
                className="btn btn-primary"
                onClick={this.handlePrevClick}
              >
                Previous
              </button>
              <button
                disabled={
                  this.state.loading ||
                  this.state.page + 1 >
                    Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                className="btn btn-primary"
                onClick={this.handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
