import React from 'react';

class ResultOption extends React.Component {

  render() {
    return (
    <div 
      className='distopt' >
      <span className='optext' onClick={(e) =>
      this.props.setStateWithDist(this.props.subarr)}>District {this.props.subarr[0]}, {this.props.subarr[1]}</span>
    </div>
    )
  }
}

export default ResultOption;