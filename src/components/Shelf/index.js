import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import Filters from './../Filters/index.js';
import Listing from './../Listing/index.js';
import './style.css';
import { withFirebase } from './../Firebase';

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrangements: [],
      filters: {
        flowerType: {
          // Check if the catalog item has the types of flowers the user is searching for
          func: (catalogItem,constraint) => {return catalogItem.flowers.filter(flower => constraint.includes(flower.type) || constraint.length == 0).length > 0},
          // The array of flower types the user is searching for
          constraint: []
        },
        distance: {
          // Check if the distance between the coordinates of the search location and catalong item location is within range
          func: (catalogItem,constraint) => {return this.calcCrow(catalogItem.coords,constraint.searchCoord) <= constraint.searchRadius},
          // The coordinates of where the user is searching from and the radius they want to search within (default coordinate is of 60201)
          constraint: {searchCoord: {lat: 42.060011, lng: -87.692626}, searchRadius: 50}
        }
      },
      flowerTypes: ['Roses', 'Lilies', 'Waxflowers', 'Alstroemeria', 'Mums', 'Carnations']
    };

    this.calcCrow = this.calcCrow.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  // componentWillMount = () => {
  //   this.props.firebase.arrangements().on('value', snapshot => {
  //     var data = snapshot.val();
  //     console.log(data);
  //     this.setState({
  //       arrangements: data
  //   //     maxLoad: data.filter(location => location.distance <= this.state.radius).length
  //     });
  //   //  });
  //   // this.props.firebase.types().on('value', snapshot => {
  //   //   this.setState({
  //   //    locationTypes: snapshot.val()
  //   //   });
  //   });
  // };
  //
  // componentWillUnmount = () => {
  //   this.props.firebase.arrangements().off();
  // };

  // Converts numeric degrees to radians
  toRad = (Value) => {
    return Value * Math.PI / 180;
  };

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in miles)
  calcCrow = (coords1, coords2) => {
    // var R = 6.371; // km
    let R = 6371;
    let dLat = this.toRad(coords2.lat-coords1.lat);
    let dLon = this.toRad(coords2.lng-coords1.lng);
    let lat1 = this.toRad(coords1.lat);
    let lat2 = this.toRad(coords2.lat);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d/1.6; // Divide by 1.6 because d is in km and there are 1.6km/mile
  };

  // Check if a catalog item meets the search criteria
  checkFilter = (flower) => {
    let filters = this.state.filters;
    let filterPass = true;
    let filterEntries = Object.entries(filters);

    // Check if the given catalog item passes each of the filter checks
    for (const [filterType, filterMethods] of filterEntries) {
      // If an item does not pass a filter then return false tell the caller to exclude this catalog item
      if (!filterMethods.func(flower, filterMethods.constraint)) {
        filterPass = false;
        return filterPass;
      }
    }

    // This will return true
    return filterPass;
  }

  // Update filters state with new constraints
  updateFilters = (updatedFilters) => {
    this.setState({filters: updatedFilters});
  }

  render() {
    return (
      <div className="shelf">
        <Filters updateFilters={this.updateFilters} calcCrow={this.calcCrow} flowerTypes={this.state.flowerTypes} filters={this.state.filters} />
        {this.state.arrangements.filter(flower => this.checkFilter(flower)).map(flower => (
          <Listing data={flower} />
        ))}
      </div>
    );
  }
}

export default Shelf
