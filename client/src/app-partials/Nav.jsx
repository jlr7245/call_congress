import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor() {
    super();
    this.decideWhatToRender = this.decideWhatToRender.bind(this);
  }

  decideWhatToRender() {
    if (this.props.auth) {
      return (
        <ul>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/logout'>Log Out</Link></li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/search'>Search</Link></li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav>
        {this.decideWhatToRender()}
      </nav>
    )
  }
}

export default Nav;