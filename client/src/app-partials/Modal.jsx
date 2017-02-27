import React from 'react';
//import axios from 'axios';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // binds
  }

  render() {
    return (
      <div>
        <h1>More info about {this.props.legislator.bioguide_id}.</h1>
      </div>
    )
  }
}

export default Modal;