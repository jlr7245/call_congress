import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Login from './page-partials/Login';
import Register from './page-partials/Register';
//import Home from './Home';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: this.props.stage,
    }
  }
  
  whichStage() { /// this can stay in this one
    if (this.state.stage === 'login') {
      return (<Login handleLogin={this.props.handleLogin} />)
    } else {
      return (<Register 
        registration={this.props.registration} 
        handleRegister={this.props.handleRegister} 
        setStateWithDist={this.props.setStateWithDist}
      />)
    }
  }
  

  render() {
    return (
        <div className='overlay'>
          <div className='formcontainer'>
            <Link to='/'><span className='close'><i className='fa fa-times fa-fw'></i></span></Link>
            {this.whichStage()}
          </div>
        </div>
    )
  }
}

export default Auth;