import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import AddToCalendar from 'react-add-to-calendar';
import ConfirmationBanner from '../ConfirmationBanner';
import { withFirebase } from '../Firebase';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: {},
      showBanner: false
    };
  }

  componentWillMount = () => {
    if (localStorage.getItem('showBanner') === "True") {
      this.setState({'showBanner': true})
    }
    let newData = JSON.parse(localStorage.getItem('listing'));
    // Need to make the string dates date objects
    newData.startTime = new Date(newData.startTime);
    newData.endTime = new Date(newData.endTime);
    this.setState({listing:newData});
  }

  componentDidMount = () => {
    localStorage.setItem('showBanner', 'False');
  };

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
        {this.state.showBanner && <ConfirmationBanner />}
        <div className="confirmation">
          <h1>Your Gift</h1>
          <img src={require('../../static/images/'+this.state.listing.image)} alt="staticImage"/>
          <p className="instructions">
            "{this.state.listing.title}" will be available for pickup {this.state.listing.startTime.getMonth()+1}/{this.state.listing.startTime.getDate()} between {((this.state.listing.startTime.getHours()-1)%12)+1}:{this.state.listing.startTime.getMinutes()<10?"0"+this.state.listing.startTime.getMinutes():this.state.listing.startTime.getMinutes()}{this.state.listing.startTime.getHours()>11?"pm":"am"} and {((this.state.listing.endTime.getHours()-1)%12)+1}:{this.state.listing.endTime.getMinutes()<10?"0"+this.state.listing.endTime.getMinutes():this.state.listing.endTime.getMinutes()}{this.state.listing.endTime.getHours()>11?"pm":"am"}.
          </p>
          <SeeReservation data={this.state.listing}/>
          <div className="helperbuttons">
            <AddToCalendar event={event}/>
            <GetDirections address={google_link}/>
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
                <td>Flowers</td>
                <td><ul>{flowers}</ul></td>
              </tr>
              <tr>
                <td>Pickup Address</td>
                <td>{this.props.data.location}</td>
              </tr>
              <tr>
                <td>Additional Information</td>
                <td>{this.props.data.additionalInfo}</td>
              </tr>
            </tbody>
          </table>
          <span className="description">{this.props.data.description}</span>
        </div>
      </div>
    )
  }
}

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
        <a className="cancel" href="/">Cancel Reservation</a>
      </div>
    )
  }
}
class GetDirections extends Component {
  render() {
    return (
      <a className='getdirections' href={this.props.address}>Get Directions</a>
    )
  }
}

Confirmation= withFirebase(Confirmation);

export default Confirmation;
