import React from 'react';
import axios from 'axios';

import ResultOption from './Resultoption';

class Register extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.componentDidMount = this.componentDidMount.bind(this);
    this.locationFinder = this.locationFinder.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    this.setStateWithDist = this.setStateWithDist.bind(this);
    this.districtPicker = this.districtPicker.bind(this);
    // state
    this.state = {
      st: '',
      dst: '',
      resultpicker: false
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
    }).then((res) => {
      if (res.data.resultArray.length == 1) {
        this.setStateWithDist(res.data.resultArray);
      } else {
        this.setState({
          resultpicker: true,
          resArray: res.data.resultArray
        })
      }
    })
      .catch((err) => console.log(err));
  }
  
  setStateWithDist(resArr) {
    console.log('hi');
    this.setState({
      st: resArr[1],
      dst: resArr[0]
    });
  }

  districtPicker(arr) {
    return arr.map((subarr, i) => {
      return (
        <ResultOption key={i} 
          subarr={subarr} 
          setStateWithDist={this.setStateWithDist} 
        />
      )
    })
  }


  render() {

    return (
      <div>
        {(this.state.resultpicker) ? this.districtPicker(this.state.resArray) : ''}
        <form onSubmit={(e) => this.props.handleRegister(e)}>
          <input type='text' name='name' placeholder='name' required />
          <input type='text' name='username' placeholder='username' required />
          <input type='email' name='email' placeholder='email' required />
          <input type='password' name='password' placeholder='password' required />
          <input type='text' name='state' defaultValue={this.state.st} required />
          <input type='text' name='district' defaultValue={this.state.dst} required />
          <input type='submit' value='Register!' />
        </form>
      </div>
    )
  }

}

export default Register;