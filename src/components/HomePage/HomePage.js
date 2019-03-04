import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Header/index.js';
import './style.css';

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
  // NEED TO ADD FUNCTIONALITY OF SELECTING CHECKBOXES
  constructor(props) {
    super(props);
    this.state = {
      expandFlowerType:false
    };
    this.flowerTypeToggle = this.flowerTypeToggle.bind(this);
  }
  flowerTypeToggle() {
    this.setState({expandFlowerType:(!this.state.expandFlowerType)});
  };
  render() {
    let flowerTypeRows = [];
    for (var i = 0; i < this.props.availableFilters.flowerTypes.length; i++) {
      flowerTypeRows.push(
        <li><input type="checkbox" value={this.props.availableFilters.flowerTypes[i]} /> {this.props.availableFilters.flowerTypes[i]}</li>
      );
    }
    return (
      <div className="filters">
        <div className='filter'>
          <span onClick={() => this.flowerTypeToggle()}>{(this.props.filters.flowerType.length==0)?"Flower Type":this.props.filters.flowerType.join(", ")}</span>
          <ul className={this.state.expandFlowerType?"expand":"hidden"}>{flowerTypeRows}</ul>
        </div>
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
        }
      ],
      filters: {
        flowerType: []
      },
      availableFilters: {
        flowerTypes: []
      }
    };
    this.addFlowerType = this.addFlowerType(this);
    this.removeFlowerType = this.removeFlowerType(this);
  }
  addFlowerType() {
    let stateCopy = this.state;
  }
  removeFlowerType() {
    let stateCopy = this.state;
  }
  componentDidMount = () => { // This function gets a list of available flower types from the catalog
    for (let i = 0; i < this.state.catalog.length; i++) {
      for (let j = 0; j < this.state.catalog[i].flowers.length; j++) {
        if (this.state.availableFilters.flowerTypes.findIndex((flower) => {return this.state.catalog[i].flowers[j].type == flower;}) == -1) {
          // Flower has not been seen yet, add it to available filter
          let stateCopy = this.state;
          stateCopy.availableFilters.flowerTypes.push(this.state.catalog[i].flowers[j].type);
          this.setState(stateCopy);
        }
      }
    }
  }
  render() {
    let rows = [];
    for (let i = 0; i < this.state.catalog.length; i++) {
      // Filtering will happen here
      rows.push(
        <Listing data={this.state.catalog[i]} availableFilters={this.state.availableFilters} />
      );
    }
    
    return (
      <div className="shelf">
        <Filters filters={this.state.filters} availableFilters={this.state.availableFilters}/>
        {rows}
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

export default HomePage;
