import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <ul className='footer-nav'>
          <li><Link to='/'><i className='fa fa-home fa-fw D'></i> Home</Link></li>
          <li><Link to='/about'><i className='fa fa-info fa-fw D'></i> About</Link></li>
          <li><Link to='/search'><i className='fa fa-search fa-fw D'></i> Legislator Search</Link></li>
          <li><Link to='/bills'><i className='fa fa-university fa-fw D'></i> Bills</Link></li>
        </ul>
      </footer>
    )
  }
}

export default Footer;