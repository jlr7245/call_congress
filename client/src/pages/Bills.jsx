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
    //state
    this.state = {
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
  }

  render() {
    return (
      <div>
        <h1>Here are the current bills before congress & the house.</h1>
        {/* tabs */}
      </div>
    )
  }
}

export default Bills;
