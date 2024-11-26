import React, { Component } from 'react'
import loader from "../assets/images/loader.gif";
export default class Loader extends Component {
  render() {
    return (
      <div className='text-center mb-5'>
        <img src={loader} alt="" />
      </div>
    )
  }
}
