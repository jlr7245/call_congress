import React from 'react';
import axios from 'axios';

import ResultOption from './Resultoption';

class Register extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.districtPicker = this.districtPicker.bind(this); // edit
  }

  districtPicker(arr) { // this can stay here but
    return arr.map((subarr, i) => {
      let isPicked;
      if ([this.props.registration.dst, this.props.registration.st].join('') == subarr.join('')) {
            // ^^ these will need to be passed down
        isPicked = true;
      } else { 
        isPicked = false;
      }
      return (
        <ResultOption key={i} 
          isPicked={isPicked}
          subarr={subarr} 
          setStateWithDist={this.props.setStateWithDist} 
        />
      )
    })
  }


  render() {
    return (
      <div className='regform'>
        <h1>Thanks for joining CallCongress!</h1>
        {(this.props.registration.resultpicker) ? this.districtPicker(this.props.registration.resArray) : <span className='waiting'>We're finding your location... please be patient</span>}
        <form onSubmit={(e) => this.props.handleRegister(e, this.props.registration.st, this.props.registration.dst)}>
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