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
        <span className='close' onClick={this.props.closeModal}>
          <i className='fa fa-times fa-fw wht'></i>
        </span>
        <h1 className='wht'>More info about {this.props.legislator.bioguide_id}.</h1>
      </div>
    )
  }
}

export default Modal;