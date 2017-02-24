import React, {PropTypes} from 'react';
import axios from 'axios';


class Dash extends React.Component {
  constructor(props) {
    super(props);
    // binds
    this.componentDidMount = this.componentDidMount.bind(this);
    // state
    this.state = {
      legislators: [],
    }
  }

  componentDidMount() {
    axios.get(`/api/dash/${this.props.user.id}`)
  }

  render() {
    return (
      <div className='dash'>
        <h1>Welcome to your dashboard</h1>
      </div>
    )
  }
}

export default Dash;