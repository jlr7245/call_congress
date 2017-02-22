import React, {PropTypes} from 'react';
import axios from 'axios';


class Dash extends React.Component {
  constructor(props) {
    super(props);
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