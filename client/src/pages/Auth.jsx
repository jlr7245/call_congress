import React, {PropTypes} from 'react';

import Login from './page-partials/Login';
import Register from './page-partials/Register';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: this.props.stage,
    }
  }
  
  whichStage() { /// this can stay in this one
    if (this.state.stage == 'login') {
      return (<Login handleLogin={this.props.handleLogin} />)
    } else {
      return (<Register handleRegister={this.props.handleRegister} />)
    }
  }
  

  render() {
    return (
      <div>
        {this.whichStage()}
      </div>
    )
  }
}

export default Auth;