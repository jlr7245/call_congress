import React, {PropTypes} from 'react';
import axios from 'axios';

import Legislator from './dash-partials/Legislator';
import Modal from '../app-partials/Modal';


class Dash extends React.Component {
  constructor(props) {
    super(props);
    // binds
    this.componentDidMount = this.componentDidMount.bind(this);
    this.renderLegislators = this.renderLegislators.bind(this);
    this.pickLegislator = this.pickLegislator.bind(this);
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

  // ======= which legislator goes in the modal?
  pickLegislator(id) {
    return this.state.legislators.find((legislator) => {
      return legislator.bioguide_id === id;
    })
  }

  render() {
    return (
      <div className='dash'>
        <h1>Welcome to your dashboard</h1>
        <ul>
          {(this.state.legislators !== undefined) ? this.renderLegislators(this.state.legislators) : ('Loading legislators...')}
        </ul>
        { (this.props.modal.show) 
          ? <Modal 
              legislator={this.pickLegislator(this.props.modal.id)} 
              modal={this.props.modal} 
            /> 
          : 'Choose a legislator above to learn more.' }
      </div>
    )
  }
}

export default Dash;