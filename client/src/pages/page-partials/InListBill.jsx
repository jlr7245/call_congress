import React from 'react';

class InListBill extends React.Component {
  render() {
    const law = this.props.law;

    return (
      <li>
        <div className='top'>     
            <span className='flag'>{law.status_tag_cc.toUpperCase()} {law.latest_major_action_date}</span>
            <span className='name'>{law.number}</span>
          <button className='learnmore' onClick={() => this.props.learnLaw(law.lookup_cc)}><i classNameName='fa fa-fw fa-info-circle'></i></button>
          <button className='watch' onClick={() => this.props.watchLaw(law.lookup_cc)}><i classNameName='fa fa-fw fa-eye'></i></button>
        </div>
        <div className='parent'>
          <div className='about-law'>
            <span className='title'><label>Title</label>{law.title}</span>
            <span className='lma'>{law.latest_major_action}</span>
          </div>
          <div className='smaller'>
            <span className='intr'><label>Introduced</label> {law.introduced_date}</span>
            <span className='sponsor'>Sponsor</span>
            <span className='tag'>{(law.primary_subject !== undefined) ? law.primary_subject : ''}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default InListBill;