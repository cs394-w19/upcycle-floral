import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import staticImage from '../../static/images/lily_static.jpeg';
import AddToCalendar from 'react-add-to-calendar';
import ConfirmationBanner from '../ConfirmationBanner';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Birthday Blooms",
      description: 'This bright arrangement is perfect as a great party centerpiece or to send to a loved one far away.',
      location: '7033 N Moselle Ave, Chicago, IL 60646',
      startTime: new Date('2019-04-21T10:00:00-05:00'),
      endTime: new Date('2019-04-21T12:00:00-05:00'),
      currency: "$",
      originalValue: 35,
      purchaseValue: 0,
      originalDate: new Date('2019-04-16'),
      numberOfFlowers: 50,
      showBanner: true,
      originalUse: "Sanders/Wingo Wedding",
      estimatedWidth: "12",
      estimatedLength: "18",
      estimatedHeight: "20",
      estimatedWeight:"20",
      instruction: "Entrance is located on the right side of the building. Please ring the door bell and ask for Sanders to fetch the flowers."
    };
  }

  componentWillMount = () => {
    if (localStorage.getItem('showBanner') && this.state.showBanner) {
      this.setState({'showBanner': false})
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem('showBanner')) {
      localStorage.setItem('showBanner', 'False');
    }
  }

  render() {
    let google_link = "https://www.google.com/maps/search/?api=1&query=" + this.state.location.replace(/ /g, "+");
    let event = {
      title: `"${this.state.title}" Pickup`,
      description: `Pickup for "${this.state.title}"`,
      location: this.state.location,
      startTime: this.state.startTime.toISOString(),
      endTime: this.state.endTime.toISOString(),
    };
    return (
      <div>
        {this.state.showBanner && <ConfirmationBanner />}
        <div className="confirmation">
          <h1>Your Gift</h1>
          <img src={staticImage} alt="staticImage"/>
          <p className="instructions">
            "{this.state.title}" will be available for pickup {this.state.startTime.getMonth()+1}/{this.state.startTime.getDate()} between {((this.state.startTime.getHours()-1)%12)+1}:{this.state.startTime.getMinutes()<10?"0"+this.state.startTime.getMinutes():this.state.startTime.getMinutes()}{this.state.startTime.getHours()>11?"pm":"am"} and {((this.state.endTime.getHours()-1)%12)+1}:{this.state.endTime.getMinutes()<10?"0"+this.state.endTime.getMinutes():this.state.endTime.getMinutes()}{this.state.endTime.getHours()>11?"pm":"am"}.
          </p>
          <SeeReservation data={this.state}/>
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
                <td>{this.props.data.numberOfFlowers}</td>
              </tr>
              <tr>
                <td>Originally Used For:</td>
                <td>{this.props.data.originalUse}</td>
              </tr>
              <tr>
                <td>Original Date of Arrangement:</td>
                <td>{this.props.data.originalDate.getMonth()+1}/{this.props.data.originalDate.getDate()+1}/{this.props.data.originalDate.getFullYear()}</td>
              </tr>
              <tr>
                <td>Pickup Address:</td>
                <td>{this.props.data.location}</td>
              </tr>
              <tr>
                <td>Estimated Sizing&Weight:</td>
                <td>{this.props.data.estimatedWidth}"x{this.props.data.estimatedLength}"x{this.props.data.estimatedHeight}"&{this.props.data.estimatedWeight}lb</td>
              </tr>
              <tr>
                <td>Instruction for Pick Up:</td>
                <td>{this.props.data.instruction}</td>
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

export default Confirmation;
