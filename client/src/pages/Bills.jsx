import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';

import BillList from './page-partials/BillList';

class Bills extends React.Component {
  constructor() {
    super();
    //binds
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setActive = this.setActive.bind(this);
    //state
    this.state = {
      active: 'senate',
      senateInfo: [],
      houseInfo: []
    }
  }

  componentDidMount() {
    console.log('hey there');
    axios.get('/api/ext/bills')
      .then((res) => {
        this.setState({
          senateInfo: res.data.senateInfo,
          houseInfo: res.data.houseInfo
        })
      })
      .catch((err) => console.log(err));
      console.log(this.state.houseInfo === this.state.senateInfo);
  }

  setActive(which) {
    console.log('set ' + which);
    this.setState({active: which});
  }

  render() {
    return (
      <div className='billholder'>
        <h1>Here are the current bills before the senate & the house.</h1>
        <ul className='faketabs'>
          <li className={(this.state.active === 'senate') ? 'activetab' : 'basetab'} onClick={() => this.setActive('senate')}>Senate</li>
          <li className={(this.state.active === 'house') ? 'activetab' : 'basetab'} onClick={() => this.setActive('house')}>House</li>
        </ul>
        <div className='bills-list'>
          {(this.state.active == 'senate') ? 
          <BillList laws={this.state.senateInfo} 
            watchLaw={this.props.watchLaw}  
            learnLaw={this.props.learnLaw} /> : 
          <BillList laws={this.state.houseInfo} 
            watchLaw={this.props.watchLaw} 
            learnLaw={this.props.learnLaw} /> }
          </div>
      </div>
    )
  }
}

export default Bills;
