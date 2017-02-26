import React from 'react';

class ShortLegislator extends React.Component {
  constructor() {
    super();
    this.renderShortLeg = this.renderShortLeg.bind(this);
    this.renderSenInfo = this.renderSenInfo.bind(this);
    this.renderRepInfo = this.renderRepInfo.bind(this);
  }

  renderSenInfo(rank, state, party) {
    return (<p className={`info ${party}`}>{`${rank} Senator from ${state}`}</p>)
  }

  renderRepInfo(district, state, party) {
     return (<p className={`info ${party}`}>{`Representative from ${state}-${district}`}</p>)
  }

  renderShortLeg() {
    let legislator = this.props.legislator;
    let info;
    if (legislator.hasOwnProperty('state_rank')) {
      info = this.renderSenInfo(legislator.state_rank, legislator.state_name, legislator.party);
    } else if (legislator.hasOwnProperty('district')) {
      info = this.renderRepInfo(legislator.district, legislator.state, legislator.party);
    }
    return (
      <article>
        <div className='shorthead'>
          <h3><i className={`fa fa-circle-o ${legislator.party}`}></i>{legislator.first_name} {legislator.last_name}</h3>
          {info}
        </div>
        <div className='contact'>
          <h2 className='shrtphn'><i className='fa fa-phone fa-2x'></i> <span>{legislator.phone}</span></h2>
        </div>
      </article>
      )
  }

  render() {
    return (
        <li key={this.props.legislator.bioguide_id} className={this.props.legislator.party}>
          {this.renderShortLeg()}
        </li>
      );
  }
}

export default ShortLegislator;