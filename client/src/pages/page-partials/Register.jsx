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
        this.setState({
          resultpicker: true,
          resArray: res.data.resultArray
        })
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
      let isPicked;
      if ([this.state.dst, this.state.st].join('') == subarr.join('')) {
        isPicked = true;
      } else { 
        console.log(subarr);
        console.log([this.state.dst, this.state.st]);
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