import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AddToCalendar from 'react-add-to-calendar';
import { withFirebase } from '../Firebase';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
    };
  }

  componentWillMount = () => {
    let newData = JSON.parse(localStorage.getItem('listing'));
    // Need to make the string dates date objects
    newData.startTime = new Date(newData.startTime);
    newData.endTime = new Date(newData.endTime);
    this.setState({listing:newData});
  }

  render() {
    let google_link = "https://www.google.com/maps/search/?api=1&query=" + this.state.listing.location.replace(/ /g, "+");
    let event = {
      title: `"${this.state.listing.title}" Pickup`,
      description: `Pickup for "${this.state.listing.title}"`,
      location: this.state.listing.location,
      startTime: this.state.listing.startTime.toISOString(),
      endTime: this.state.listing.endTime.toISOString(),
    };
    return (
      <div>
        <div className="confirmation">
          <h1>Details</h1>
          <img src={require('../../static/images/'+this.state.listing.image)} alt="staticImage"/>
          <span className="description">{this.state.listing.description}</span>
          <SeeReservation data={this.state.listing}/>
          <div className="helperbuttons">
            <Reserve />
            <Cancel />
          </div>
        </div>
      </div>
    );
  }
}

class SeeReservation extends Component {
  render() {
    let flowers = this.props.data.flowers.map((x,index) => {
      return (<li>{x.number} {x.type}</li>);
    });
    return (
      <div className="seereservation">
        <div className="viewing">
          <table>
            <tbody>
              <tr>
                <td>Seller</td>
                <td>{this.props.data.seller}</td>
              </tr>
              <tr>
                <td>Flowers</td>
                <td><ul>{flowers}</ul></td>
              </tr>
              <tr>
                <td>Pickup Address</td>
                <td>{this.props.data.location}</td>
              </tr>
              <tr>
                <td>Pickup Time</td>
                <td>{this.props.data.startTime.getMonth()+1}/{this.props.data.startTime.getDate()} between {((this.props.data.startTime.getHours()-1)%12)+1}:{this.props.data.startTime.getMinutes()<10?"0"+this.props.data.startTime.getMinutes():this.props.data.startTime.getMinutes()}{this.props.data.startTime.getHours()>11?"pm":"am"} and {((this.props.data.endTime.getHours()-1)%12)+1}:{this.props.data.endTime.getMinutes()<10?"0"+this.props.data.endTime.getMinutes():this.props.data.endTime.getMinutes()}{this.props.data.endTime.getHours()>11?"pm":"am"}</td>
              </tr>
              <tr>
                <td>Additional Information</td>
                <td>{this.props.data.additionalInfo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Cancel extends Component {
  render() {
    return (
      <div className="button cancel">
        <a className="cancel" href="/">Back to Search</a>
      </div>
    )
  }
}
class Reserve extends Component {
  reserve = () => {
    localStorage.setItem('showBanner', 'True');
    window.location.assign('/confirmation');
  };
  render() {
    return (
      <a className='reserve' onClick={()=>{this.reserve()}}>Reserve Now!</a>
    )
  }
}

Confirmation= withFirebase(Confirmation);

export default Confirmation;
