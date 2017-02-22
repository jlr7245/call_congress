import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.handleRegister(e)}>
          <input type='text' name='name' placeholder='name' required />
          <input type='text' name='username' placeholder='username' required />
          <input type='email' name='email' placeholder='email' required />
          <input type='password' name='password' placeholder='password' required />
          <input type='submit' value='Register!' />
        </form>
      </div>
    )
  }

}

export default Register;