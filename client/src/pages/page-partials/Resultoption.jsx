import React from 'react';

class ResultOption extends React.Component {

  render() {
    let myClass;
    (this.props.isPicked === true) ? myClass = 'D' : myClass = 'inactive';
    return (
    <div 
      className='distopt' >
      <span className={myClass + ' optext'} onClick={(e) =>
      this.props.setStateWithDist(this.props.subarr)}>District {this.props.subarr[0]}, {this.props.subarr[1]}</span>
    </div>
    )
  }
}

export default ResultOption;