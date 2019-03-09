import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import Listing from './../Listing/index.js';
import './style.css';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpen: false,
      expandFlowerType: false
    };

    // this.handleTypeChange = this.handleTypeChange.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }

  // Function to update the flowerTypes in real time as the user clicks on the checkboxes
  // handleTypeChange = (evt, value) => {
  //   let filters = this.props.filters;
  //   if (evt.target.checked) {
  //     filters.flowerType.constraint = filters.flowerType.constraint.concat(value);
  //     this.props.updateFilters(filters);
  //   } else {
  //     let index = filters.flowerType.constraint.indexOf(value);
  //     filters.flowerType.constraint.splice(index,1);
  //     this.props.updateFilters(filters);
  //   }
  // }

  updateSearchResults = () => {
    // Update the flowerType constraints
    let flowerTypeCheckboxes = document.getElementsByClassName("flowerTypeCheckbox");
    let checkedFlowerTypes = Array.from(flowerTypeCheckboxes).filter(checkbox => checkbox.checked);
    let newConstraints = checkedFlowerTypes.map(checked => checked.value);
    let updateFilters = this.props.updateFilters;
    let filters = Object.assign({}, this.props.filters);
    filters.flowerType.constraint = newConstraints;

    // Update the search radius constraints
    let searchAddress = document.getElementById("address");
    let newRadius = document.getElementById("radius");

    // If the user inputs a search address
    if (searchAddress.value != "") {
      // Initialize the spin loader to let the user know we are fetching the results then fetch the results
      let spinner = document.getElementById('spinner');
      spinner.style.display = 'block';

      // Query the coordinates
      searchAddress = searchAddress.value.replace(/ /g, "+");
      const msgFetch = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddress}&key=AIzaSyBqnIcBpUX2t610qllmSk-Rh23g7a-Q_S8`)
      .then(function(response) { // Wait for the result and get the json object
        return response.json();
      })
      .then(function(myJson) { // Use the json object to do stuff
        if (myJson.status == "OK") {
          let searchCoordinates = myJson.results[0].geometry.location;
          filters.distance.constraint.searchCoord = searchCoordinates;
          filters.distance.constraint.searchRadius = newRadius.value != "" ? Number(newRadius.value) : 50;
          // Close the loading spinner and update the filters
          spinner.style.display = 'none';
          updateFilters(filters);
        } else {
          // Something went wrong with the Results
          alert('We were unable to apply the location radius you submitted');
          // Close the loading spinner
          spinner.style.display = 'none';
        }
      });
    } else {
      // Lift the state up and apply the new constraints
      updateFilters(filters);
    }
  }

  render() {
    const filterWindow = {
      height: this.state.filtersOpen ? 'auto' : '16px',
    };
    const flowerTypes = {
      display: this.state.expandFlowerType ? 'block' : 'hidden',
    }
    return (
      <div className="filters" style={filterWindow} multiple>
        <p onClick={() => this.setState({ filtersOpen: !this.state.filtersOpen})} className="filterToggle">
          Filters {this.state.filtersOpen ? '\u25B2' : '\u25BC'}
        </p>
        <hr />
        <div className='flowerTypeFilter'>
          <span onClick={() => this.setState({expandFlowerType: !this.state.expandFlowerType})}>
            Flower Type
          </span>
          <ul style={flowerTypes}>
            {this.props.flowerTypes.map(type => (
              <li>
                <input type="checkbox" className="flowerTypeCheckbox" value={type}/>
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className='distanceFilter'>
          Address: <input placeholder="2145 Sheridan Rd, Evanston, IL 60208" type='text' id='address' /> <br/>
          Radius: <input type='text' placeholder="50" id='radius' /> Miles <br/>
          * Leaving this empty will default to a radius of 50 miles
          <br/><br/>
        </div>
        <button onClick={this.updateSearchResults}> Update Search Results </button>
        <div id="spinner"><RingLoader color={'#005ce6'} loading={true} /> Loading.... </div>
      </div>
    );
  }
}

export default Filters
