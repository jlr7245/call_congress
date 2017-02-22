import React, {PropTypes} from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className='login-form'>
        <form onSubmit={(e) => this.props.handleLogin(e)}>
          <input type='text' required name='username' placeholder='username' />
          <input type='password' required name='password' placeholder='password' />
          <input type='submit' value='Log in!' />
        </form>
      </div>
    )
  }
}

export default Login;