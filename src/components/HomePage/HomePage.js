import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import Shelf from './../Shelf/index.js';
import Filters from './../Filters/index.js';
import Listing from './../Listing/index.js';
import { withFirebase } from './../Firebase';
import './style.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrangements: []
    }
  }

  // componentWillMount = () => {
  //   this.props.firebase.arrangements().on('value', snapshot => {
  //     var data = snapshot.val();
  //     this.setState({
  //       arrangements: data
  //     });
  //    });
  // };
  //
  // componentWillUnmount = () => {
  //   this.props.firebase.arrangements().off();
  // };

  render() {
    return (
      <div>
        <Link to={`/sellers`} className="home_link" style={{textDecoration: 'none'}}>
          Add a listing!
        </Link>
        <Shelf />
        <Link to={`/confirmation`} className="home_link">
          Click here for confirmation Page!
        </Link>
        <br/>
        <p id="showBanner" onClick={()=>localStorage.clear()}> Click to make banner appear for confirmation page </p>
        <br/>
      </div>
    );
  }
}

HomePage = withFirebase(HomePage);

export default HomePage;
