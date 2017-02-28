import React from 'react';
import { Redirect } from 'react-router-dom';

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
      return (<Register handleRegister={this.props.handleRegister} />)
    }
  }
  

  render() {
    return (
        <div className='overlay'>
          <div className='formcontainer'>
            <span className='close' /*onClick={() => this.props.closeModal()}*/><i className='fa fa-times fa-fw'></i></span>
            {this.whichStage()}
          </div>
        </div>
    )
  }
}

export default Auth;