import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import staticImage from '../../static/images/lily_static.jpeg';
import AddToCalendar from 'react-add-to-calendar';
import ConfirmationBanner from '../ConfirmationBanner';

class Confirmation extends Component {
  state = {
    event: {
      title: '"Birthday Blooms" Pick-Up',
      description: 'Pickup for "Birthday Blooms"',
      location: '7033 N Moselle Ave, Chicago, IL 60646',
      startTime: '2019-04-21T10:00:00-06:00',
      endTime: '2019-04-21T12:00:00-06:00',
    }
  };
  render() {
    let google_link = "https://www.google.com/maps/search/?api=1&query=" + this.state.event.location.replace(/ /g, "+");
    return (
      <div>
        <ConfirmationBanner />
        <div className="confirmation">
          <h1>Your Order</h1>
          <img src={staticImage} />
          <p className="instructions">
            "Birthday Blooms" will be available for pickup 4/21 between 10:00am and 12:00pm.
          </p>
          <p className="saved">
            You saved $49.99!
          </p>
          <div className="helperbuttons">
            <GetDirections address={google_link}/>
            <br />
            <Link to={`/#`} style={{textDecoration: 'none'}}>
              <Cancel />
            </Link>

              <Contact />

            <AddToCalendar event={this.state.event}/>
            <br />
          </div>
          <SeeReservation />
          <Link to={`/search`} style={{textDecoration: 'none'}}>
            {/*<SearchMore />*/}
          </Link>

        </div>
      </div>
    );
  }
}

class SeeReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minimize:true
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({minimize:(!this.state.minimize)});
  };
  render() {
    return (
      <div className="seereservation">
        <hr />
        <span className="expander" onClick={() => {this.toggle();}}>{this.state.minimize?"▶ Expand":"▼ Hide"} Details</span>
        <div className={this.state.minimize?"hidden":"viewing"}>
          <table>
            <tbody>
              <tr>
                <td>Number of Flowers:</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Original value:</td>
                <td>$49.99</td>
              </tr>
              <tr>
                <td>Original Date of Arrangement:</td>
                <td>4/16/2019</td>
              </tr>
              <tr>
                <td>Pickup Address:</td>
                <td>7033 N Moselle Ave, Chicago, IL 60646</td>
              </tr>
            </tbody>
          </table>
          <span className="description">This bright arrangement is perfect as a great party centerpiece or to send to a loved one far away.</span>
        </div>
      </div>
    )
  }
}

class SearchMore extends Component {
  render() {
    return (

      <div className="button searchmore">
        <a class="searchmore" href="#"> Back to Search</a>
      </div>
    )
  }
}

class Contact extends Component {
  render() {
    return (
      <div className="button contact">
        <a class="contact" href="#">Contact</a>
      </div>
    )
  }
}

class Cancel extends Component {
  render() {
    return (
      <div className="button cancel">
        <a class="cancel" href="#">Cancel Reservation</a>
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

export default Confirmation;
