import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AddToCalendar from 'react-add-to-calendar';
import ConfirmationBanner from '../ConfirmationBanner';
import Dropzone from 'react-dropzone';
import ImageUploader from 'react-images-upload';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { withFirebase } from '../Firebase';

class Sellers extends Component {

  constructor(props) {
    super(props);
     this.state = {
       title: "Beautiful Carnations",
       name:"",
       description: "",
       location: "2500 Lake Cook Rd, Riverwoods, IL 60015",
       coords: {},
       fitsIn: "SUV",
       imageLink: "",
       otherInfo: "Please pick up after 5pm",
       flowerTypes: [['Any', "50+"]],
       count: 1,
       dateRange: {
        from: null,
        to: null,
       }
     };
     this.onDrop = this.onDrop.bind(this);
     this.addFlowerType = this.addFlowerType.bind(this);
     this.removeFlowerType = this.removeFlowerType.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    if (pictureFiles[0]){
      this.setState({
          imageLink: pictureFiles[0].name
      });
    }
    else{
      this.setState({
          imageLink: ""
      });
    }
  }

  addFlowerType = (index, newType, newQuant, event) => {
    let currTypes = this.state.flowerTypes;
    currTypes[index] = [newType, newQuant];
    this.setState({ flowerTypes : currTypes});
  }

  removeFlowerType = (index) => {
    let currTypes = this.state.flowerTypes;
    let left = currTypes.slice(0,index);
    let right = currTypes.slice(index+1);
    this.setState({ flowerTypes: left.concat(right)});
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value});
  }

  changeOtherInfo = (event) => {
    this.setState({ otherInfo: event.target.value});
  }

  changeLocation = (event) => {
    this.setState({ location: event.target.value});
  }

  changeFitsIn = (event) => {
    this.setState({ fitsIn: event.target.value});
  }

  changePickupDate = (event) => {
    this.setState({ pickupDate: event.target.value});
  }

  changeName = (event) => {
    this.setState({ name: event.target.value});
  }

  changeDescription = (event) => {
    this.setState({ description: event.target.value});
  }

  render() {
    if (false) {
      // Seems to be code for future — Jon
      let { from: startTime, to: endTime } = this.state.dateRange;
      let google_link = "https://www.google.com/maps/search/?api=1&query=" + this.state.location.replace(/ /g, "+");
      let event = {
        title: `"${this.state.title}" Pickup`,
        description: `Pickup for "${this.state.title}"`,
        location: this.state.location,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };
    }
    return (
      <div>
        <div className="confirmation">
          <h1>Create a Listing</h1>
          <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Arrangement Information</legend>
            <p className="saved">
              Please provide as much information about the arrangement as you can
            </p>
            <table><tbody>
              <tr>
                <td>Title of Arrangement</td>
                <td><input type="text" value={this.state.title} onChange={this.changeTitle} /></td>
              </tr>
              <tr>
                <td>Arrangement Description</td>
                <td><textarea rows="3" cols="23" value={this.state.description} onChange={this.changeDescription}></textarea></td>
              </tr>
              <tr>
                <td colSpan="2"><br />Flower Details</td>
              </tr>
              <tr>
                <td colSpan="2">
                 {this.state.flowerTypes.map( (type, index) => (
                   <div className="flowertype" key={type}>
                     <label>
                       Type:&nbsp;
                       <select value={this.state.flowerTypes[index][0]} onChange={(e) => this.addFlowerType(index, e.target.value, this.state.flowerTypes[index][1], e)}>
                         <option value="Any">Any</option>
                         <option value="Roses">Roses</option>
                         <option value="Tulips">Tulips</option>
                         <option value="Dandelions">Dandelions</option>
                         <option value="Other">Other</option>
                       </select>
                     </label>
                     <label>
                       Quantity:&nbsp;
                       <select value={this.state.flowerTypes[index][1]} onChange={(e) => this.addFlowerType(index, this.state.flowerTypes[index][0], e.target.value, e)}>
                         <option value="1-12">1-12</option>
                         <option value="12-25">12-25</option>
                         <option value="25-50">25-50</option>
                         <option value="50+">50+</option>
                       </select>
                       <span onClick={() => this.removeFlowerType(index)} className={`removeFlowerType ${index==0?"invisible":""}`}>X</span>
                     </label>
                   </div>
                  ))}
                  <button type="button" className="addflower" onClick={(e) => this.addFlowerType(this.state.flowerTypes.length, "Any", "1-12", e)}> + Add another flower type </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2"><br />Image of Arrangement (If Available)</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <ImageUploader
                	withIcon={true}
                	buttonText='Upload photos'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                	maxFileSize={5242880}
                    withPreview={true}
                    label='Max file size: 5mb, Accepted: .jpg | .png | .gif'
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">How large a container do your flowers require?</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <select className="sizeselector" value={this.state.fitsIn} onChange={this.changeFitsIn}>
                    <option value="basket">Basket</option>
                    <option value="car">Small Car</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                  </select>
                </td>
              </tr>
            </tbody></table>
          </fieldset>
          <fieldset>
            <legend>Your Information</legend>
            <table><tbody>
              <tr>
                <td>Name and/or Organization</td>
                <td><input type="text" onChange={this.changeName} /></td>
              </tr>
              <tr>
                <td>Pickup Address</td>
                <td><input type="text" value={this.state.location} onChange={this.changeLocation} /></td>
              </tr>
              <tr>
                <td colSpan="2">Pickup Time Availability</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <DayPicker
                    onDayClick={this.handleDateSelection}
                    month={this.state.startTime}
                    selectedDays={[this.state.dateRange, this.state.dateRange.from]}
                    disabledDays={{before: new Date()}}
                  />
                </td>
              </tr>
            </tbody></table>
          </fieldset>
            <p className="saved"> Add any other important information below </p>
            <textarea rows="3" cols="50" wrap="physical" name="otherinfo" placeholder="Pickup instructions, freshness, or other important details" value={this.state.otherInfo} onChange={this.changeOtherInfo}></textarea>
          </form>
          <div className="helperbuttons">
            <SubmitListing parState={this.state} firebase={this.props.firebase}/>
            <Cancel />
          </div>
        </div>
      </div>
    );
  }

  handleDateSelection = day => {
    let { dateRange } = this.state;
    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      this.setState({ dateRange: { from: day, to: null } })
    } else {
      this.setState({
        dateRange: DateUtils.addDayToRange(day, dateRange)
      })
    }
  }
}

const FlowerTypeSelection = (index, remove) => {
  return (
    <div>
      <label>
        Flower Type:
        <select>
          <option value="Any">Any</option>
          <option value="Roses">Roses</option>
          <option value="Tulips">Tulips</option>
          <option value="Dandylions">Dandylions</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Quantity:
        <select>
          <option value="1-12">1-12</option>
          <option value="12-25">12-25</option>
          <option value="25-50">25-50</option>
          <option value="50+">50+</option>
        </select>
      </label>
      <span onClick={() => remove(index)} className={`removeFlowerType${index==0?" invisible":""}`}>X</span>
      <br />
    </div>
)};

class SearchMore extends Component {
  render() {
    return (

      <div className="button searchmore">
        <a className="searchmore" href="/"> Back to Search</a>
      </div>
    )
  }
}

class Cancel extends Component {
  render() {
    return (
      <div className="button cancel">
        <a className="cancel" href="/">Go Back to Search</a>
      </div>
    )
  }
}
class SubmitListing extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount = () => {
    this.props.firebase.listings().off();
  };

  handleSubmit = (event) => {
    window.location.assign("/");
    return;
    let parState = JSON.parse(JSON.stringify(this.props.parState));
    let parStateObject = this.props.parState
    let addressLocation = parStateObject.location.replace(/ /g, "+");
    let propsFirebase = this.props.firebase;
    const msgFetch = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressLocation}&key=AIzaSyBqnIcBpUX2t610qllmSk-Rh23g7a-Q_S8`)
    .then(function(response) { // Wait for the result and get the json object
      return response.json();
    })
    .then(function(myJson) { // Use the json object to do stuff
      if (myJson.status == "OK") {
        let searchCoordinates = myJson.results[0].geometry.location;

        parStateObject.coords = searchCoordinates;
      } else {
        // Something went wrong with getting the coordinates of the location submitted. Default coordinates (tech address) will be used
        parStateObject.coords = {lat: 42.008077, lng: -87.777476};
        alert('We were unable to fetch the coordinates of the location you submitted. We set a default for 2145 Sheridan Road Evanston, IL 60201');
      }
      delete parState["count"];
      let from = parState["dateRange"]["from"];
      var date = parState["dateRange"]["from"].slice(0, 10) + " to " + parState["dateRange"]["to"].slice(0, 10);
      delete parState["dateRange"];
      parState["pickupDate"] = date;
      propsFirebase.listings().push().set(parState);
      alert('Your listing has been submitted!');
    });
  }

  render() {
    return (
      <button className='getdirections' type="button" onClick={this.handleSubmit}>Submit Listing</button>
    )
  }
}

Sellers = withFirebase(Sellers);

export default Sellers;
