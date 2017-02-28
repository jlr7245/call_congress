import React from 'react';
//import axios from 'axios';

class Login extends React.Component {

  render() {
    return (
      <div className='login-form'>
        <h1>Welcome back!</h1>
        <form onSubmit={(e) => this.props.handleLogin(e)}>
          <div>
            <input type='text' required name='username' placeholder='Username' />
            <input type='password' required name='password' placeholder='Password' />
          </div>
          <input className='submitb' type='submit' value='Log in!' />
        </form>
      </div>
    )
  }
}

export default Login;