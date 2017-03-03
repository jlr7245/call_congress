import React from 'react';
import axios from 'axios';

import ResultOption from './Resultoption';

class Register extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.componentDidMount = this.componentDidMount.bind(this); // edit
    this.locationFinder = this.locationFinder.bind(this); // move
    this.getDistrict = this.getDistrict.bind(this); // move
    this.setStateWithDist = this.setStateWithDist.bind(this); // move
    this.districtPicker = this.districtPicker.bind(this); // edit
    // state
    this.state = {
      st: '',
      dst: '',
      resultpicker: false
    }
  }

  componentDidMount() {
    this.locationFinder(); // this.props.locationFinder()
  }

  locationFinder() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getDistrict); // should also have an error handler here; see below
    } else {
      console.log('no location');
    }
  }

  // navigator.geolocation.getCurrentPosition(this.getDistrict, this.showError)
  // go back to the concept of having a 'message' field in state and just putting it 
  // in various components as errors & so on occur?

  // this error handler is from https://www.w3schools.com/HTML/html5_geolocation.asp

  /* function showError(error) { 
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
} */

  getDistrict(position) { // this won't even need to be passed down as a prop
                          // if the locationFinder function is just in the app
                          // component
    axios.post('/api/ext/geo', {
      latlng: `${position.coords.latitude},${position.coords.longitude}`
    }).then((res) => {
        this.setState({
          resultpicker: true,
          resArray: res.data.resultArray // this will need to be passed down
        })
    })
      .catch((err) => console.log(err));
  }
  
  setStateWithDist(resArr) { // this lives in app.js and will need to be passed down
    this.setState({
      st: resArr[1],
      dst: resArr[0]
    });
  }

  districtPicker(arr) { // this can stay here but
    return arr.map((subarr, i) => {
      let isPicked;
      if ([this.state.dst, this.state.st].join('') == subarr.join('')) {
            // ^^ these will need to be passed down
        isPicked = true;
      } else { 
        isPicked = false;
      }
      return (
        <ResultOption key={i} 
          isPicked={isPicked}
          subarr={subarr} 
          setStateWithDist={this.setStateWithDist} 
        />
      )
    })
  }


  render() {

    return (
      <div className='regform'>
        <h1>Thanks for joining CallCongress!</h1>
        {(this.state.resultpicker) ? this.districtPicker(this.state.resArray) : <span className='waiting'>We're finding your location... please be patient</span>}
        <form onSubmit={(e) => this.props.handleRegister(e, this.state.st, this.state.dst)}>
          <div>
            <input type='text' name='name' placeholder='name' required />
            <input type='email' name='email' placeholder='email' required />
          </div>
          <div>
            <input type='text' name='username' placeholder='username' required />
            <input type='password' name='password' placeholder='password' required />
          </div>
          <input className='submitb' type='submit' value='Register!' />
        </form>
      </div>
    )
  }

}

export default Register;