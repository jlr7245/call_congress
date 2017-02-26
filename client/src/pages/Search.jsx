import React, {PropTypes} from 'react';
import axios from 'axios';
import Redirect from 'react-router-dom';

import ShortLegislator from './search-partials/ShortLegislator';
import sunlightArray from '../data/sunlight-array';

class Search extends React.Component {
  constructor() {
    super();
    ///binds///
    this.handleChange = this.handleChange.bind(this);
    this.filterLegs = this.filterLegs.bind(this);
    ///state///
    this.state = {
      searched: null,
    }
  }

  filterLegs() {
    if (this.state.searched !== null) {
      let shortLegsToRender = sunlightArray
        .filter((leg) => (leg.first_name.toLowerCase().includes(this.state.searched))
          || (leg.last_name.toLowerCase().includes(this.state.searched))
          || (leg.state_name.toLowerCase().includes(this.state.searched))
          ).map((leg) => {
            return (<ShortLegislator legislator={leg} />)
          });
      return shortLegsToRender;
    }
  }

  handleChange(e) {
    this.setState({searched: e.target.value.toLowerCase()});
  }

  render() {
    console.log(this.state.searched);
    return (
      <div className='search'>
        <div className='searchbar'>
          <i className='fa fa-search fa-2x wht'></i>
          <input type='text' name='search'
            placeholder='Type here to search.'
            onChange={(e) => this.handleChange(e)} />
        </div>
        <div className='shortlegs'>
          <ul>
            {this.filterLegs()}
          </ul>
        </div>
      </div>
      )
  }
}

export default Search;
