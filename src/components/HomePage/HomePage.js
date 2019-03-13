import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import './style.css';
import { withFirebase } from '../Firebase';

class HomePage extends Component {
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
      flowerTypes: ['Roses', 'Lilies', 'Waxflowers', 'Alstroemeria', 'Mums', 'Carnations'],
      listings: "hello"
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

  componentDidMount = () => {
    this.props.firebase.listings().on('value', snapshot => {
      var data = snapshot.val();
      this.setState({
        listings: data
      });
     });
  };

  componentWillUnmount = () => {
    this.props.firebase.listings().off();
  };

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

Shelf = withFirebase(Shelf);

export default HomePage;
