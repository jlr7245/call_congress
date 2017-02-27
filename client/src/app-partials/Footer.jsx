import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <ul className='footer-nav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/search'>Legislator Search</Link></li>
          <li><Link to='/bills'>Bills</Link></li>
        </ul>
      </footer>
    )
  }
}

export default Footer;