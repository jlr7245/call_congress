import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.componentDidMount = this.componentDidMount.bind(this);
    this.locationFinder = this.locationFinder.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    // state
    this.state = {
      st: '',
      dst: ''
    }
  }

  componentDidMount() {
    this.locationFinder();
  }

  locationFinder() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getDistrict);
    } else {
      console.log('no location');
    }
  }

  getDistrict(position) {
    axios.post('/api/ext/geo', {
      latlng: `${position.coords.latitude},${position.coords.longitude}`
    }).then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }


  render() {
    return (
      <div>
        {this.state.lat}, {this.state.lng}
        <form onSubmit={(e) => this.props.handleRegister(e)}>
          <input type='text' name='name' placeholder='name' required />
          <input type='text' name='username' placeholder='username' required />
          <input type='email' name='email' placeholder='email' required />
          <input type='password' name='password' placeholder='password' required />
          <input type='text' name='state' defaultValue={this.state.st} placeholder='state' required />
          <input type='text' name='district' defaultValue={this.state.dst} placeholder='district' required />
          <input type='submit' value='Register!' />
        </form>
      </div>
    )
  }

}

export default Register;