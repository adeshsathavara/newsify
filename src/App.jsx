import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Header from './components/Header/Header'
import FeaturedNews from './components/FeaturedNews'
import { BrowserRouter , Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <>
        <LoadingBar
          color='#0d6efd'
          height={4}
          progress={this.state.progress}
        />
        <BrowserRouter basename="/">
          <Header />
          <Routes>
            <Route exact path="/" element={<FeaturedNews setProgress={this.setProgress} key="home" pageSize={9} country="us" category="general" />} />
            <Route exact path="/business" element={<FeaturedNews setProgress={this.setProgress} key="business" pageSize={9} country='us' category='business' />} />
            <Route exact path="/entertainment" element={<FeaturedNews setProgress={this.setProgress} key="entertainment" pageSize={9} country='us' category='entertainment' />} />
            <Route exact path="/health" element={<FeaturedNews setProgress={this.setProgress} key="health" pageSize={9} country='us' category='health' />} />
            <Route exact path="/science" element={<FeaturedNews setProgress={this.setProgress} key="science" pageSize={9} country='us' category='science' />} />
            <Route exact path="/sports" element={<FeaturedNews setProgress={this.setProgress} key="sports" pageSize={9} country='us' category='sports' />} />
            <Route exact path="/technology" element={<FeaturedNews setProgress={this.setProgress} key="technology" pageSize={9} country='us' category='technology' />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
