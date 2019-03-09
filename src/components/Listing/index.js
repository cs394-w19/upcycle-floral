import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import './style.css';

class Listing extends Component {
  render() {
    return (
      <div className="listing">
        <h2>{this.props.data.title}</h2>
        <img src={require('../../static/images/'+this.props.data.image)} /><br />
        <p>{this.props.data.description}</p>
      </div>
    );
  }
}

export default Listing
