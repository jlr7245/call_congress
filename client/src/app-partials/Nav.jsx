import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg'

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.decideWhatToRender = this.decideWhatToRender.bind(this);
  }

  decideWhatToRender() {
    if (this.props.auth) {
      return (
        <ul>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/logout'>Log Out</Link></li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav>
        <div className='toplinks'>
          {this.decideWhatToRender()}
        </div>
        <div className='logo'>
          <Link to='/'><img src={logo} className='svglogo' alt='CallCongress Logo' /></Link>
        </div>
      </nav>
    )
  }
}

export default Nav;