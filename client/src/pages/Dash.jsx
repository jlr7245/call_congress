import React, {PropTypes} from 'react';
import axios from 'axios';

import Legislator from './dash-partials/Legislator';


class Dash extends React.Component {
  constructor(props) {
    super(props);
    // binds
    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderLegislators = this.renderLegislators.bind(this);
    // state
    this.state = {
      user: this.props.user,
      legislators: [],
    }
  }

  componentDidMount() {
    axios.get(`/api/dash/${this.props.user.id}`)
      .then((res) => {
        this.setState({legislators: res.data.legislators});
      })
      .catch((err) => console.log(err));
  }

  renderLegislators(arr) {
    console.log('hi');
    let formattedLegislators = arr.map((leg, i) => {
      return <Legislator key={i} leg={leg} showModal={this.props.showModal}/* something here about adding / removing from watch list */ />
    } )
    return formattedLegislators;
  }

  render() {
    return (
      <div className='dash'>
        <h1>Welcome to your dashboard</h1>
        <ul>
          {(this.state.legislators !== undefined) ? this.renderLegislators(this.state.legislators) : ('Loading legislators...')}
        </ul>
      </div>
    )
  }
}

export default Dash;