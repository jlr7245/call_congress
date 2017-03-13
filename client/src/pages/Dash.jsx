import React from 'react';
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
    axios.get(`/api/dash/${this.props.user.id}`) // this call needs to be
                                                // moved to app.js... maybe
                                                // it should even be moved
                                                // to the success-login
                                                // middleware 🤔
      .then((res) => {
        this.setState({legislators: res.data.legislators});
      })
      .catch((err) => console.log(err));
  }

  renderLegislators(arr) { // this can stay here
    let formattedLegislators = arr.map((leg, i) => {
      return <Legislator key={i} leg={leg} showModal={this.props.showModal}/* something here about adding / removing from watch list */ />
    } )
    return formattedLegislators;
  }

  // ======= which legislator goes in the modal?
  pickLegislator(id) { // this goes into modal middleware
    return this.state.legislators.find((legislator) => {
      return legislator.bioguide_id === id;
    })
  }

  render() {
    return (
      <div className='dash'>
        <h1>Welcome to your dashboard</h1>
        <div className='leglist'>
          <ul>
            {(this.state.legislators !== undefined) ? this.renderLegislators(this.state.legislators) : ('Loading legislators...')}
          </ul>
        </div>
        { (this.props.modal.show) 
          ? <div className='overlay'> <Modal 
              legislator={this.pickLegislator(this.props.modal.id)} 
              modal={this.props.modal} 
              closeModal={this.props.closeModal}
            /> </div>
          : 'Choose a legislator above to learn more.' }
      </div>
    )
  }
}

export default Dash;