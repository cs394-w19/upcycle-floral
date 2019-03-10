import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import Filters from './../Filters/index.js';
import Listing from './../Listing/index.js';
import './style.css';

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog: [
        {
          title: "Birthday Blooms",
          description: 'This bright arrangement is perfect as a great party centerpiece or to send to a loved one far away.',
          location: '7033 N Moselle Ave, Chicago, IL 60646',
          coords: {lat: 42.008077, lng: -87.777476},
          startTime: new Date('2019-04-21T10:00:00-05:00'),
          endTime: new Date('2019-04-21T12:00:00-05:00'),
          originalDate: new Date('2019-04-16'),
          numberOfFlowers: 50,
          flowers: [
            {
              type: "Roses",
              number: 15
            }, {
              type: "Carnations",
              number: 20
            }, {
              type: "Mums",
              number: 15
            }
          ],
          image:'lily_static.jpeg'
        }, {
          title: "Lily Celebration",
          description: 'With classic floral colors including red roses and pink lilies, the Rose and Lily Celebration is a wonderful gift to send to a friend or family member for a birthday, get well or anniversary.',
          location: '7033 N Moselle Ave, Chicago, IL 60646',
          coords: {lat: 42.008077, lng: -87.777476},
          startTime: new Date('2019-04-21T10:00:00-05:00'),
          endTime: new Date('2019-04-21T12:00:00-05:00'),
          originalDate: new Date('2019-04-16'),
          numberOfFlowers: 60,
          flowers: [
            {
              type: "Roses",
              number: 15
            }, {
              type: "Lilies",
              number: 20
            }, {
              type: "Waxflowers",
              number: 15
            }, {
              type: "Alstroemeria",
              number: 10
            }
          ],
          image:'another_static.jpg'
        }
      ],
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
        {this.state.catalog.filter(flower => this.checkFilter(flower)).map(flower => (
          <Listing data={flower} />
        ))}
      </div>
    );
  }
}

export default Shelf
