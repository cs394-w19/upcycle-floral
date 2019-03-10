import React, { Component } from 'react';
import './style.css';
import Header from '../Header';
import { withFirebase } from './../Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrangements: []
    }
  }

  componentWillMount = () => {
    this.props.firebase.arrangements().on('value', snapshot => {
      var data = snapshot.val();
      console.log(data)
      this.setState({
        arrangements: data
      });
     });
  };

  componentWillUnmount = () => {
    this.props.firebase.arrangements().off();
  };

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App = withFirebase(App);

export default App;
