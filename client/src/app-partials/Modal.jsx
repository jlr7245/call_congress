import React from 'react';
//import axios from 'axios';
import moment from 'moment';

/// this need some type of conditional logic -- (this.props.modal.type == 'leg') ? this.renderLegModal() : other things. or maybe a switch case

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // binds
    this.listVotes = this.listVotes.bind(this);
  }

  listVotes(votes) {
    return votes.map((vote) => {
      return (
        <div className='vote'>
          <div className='time-vote'>
            <span className='time'>{moment(vote.when).format('MMMM DD, h:mm a')}</span>
            <span className='thevote'>{(vote.position == 'Yes') ? <span><i className='fa fa-check fa-fw'></i> {vote.position}</span> : <span><i className='fa fa-ban fa-fw'></i> {vote.position}</span> } </span>
          </div>

          <div className='vote-meta'>
            <span className='meta-top'>{vote.question} for {vote.description}</span>
            <span className='meta-bottom'>
              {vote.number} {vote.latest_action}
            </span>
          </div>
        </div>
      )
    });
  }

  render() {
    const legislator = this.props.legislator;
    const modalInfo = this.props.modal.info;

    let legSite;
    if (legislator.hasOwnProperty('website') && legislator.website !== null) {
      legSite = (<a href={legislator.website} target='_blank'>
              <i className={`fa fa-link fa-2x fa-fw ${legislator.party}`}></i>
            </a>);
    } else legSite='';
    let legTwit;
    if (legislator.hasOwnProperty('twitter_id') && legislator.twitter_id !== null) {
      legTwit = (<a href={`https://www.twitter.com/${legislator.twitter_id}`} target='_blank'>
              <i className={`fa fa-twitter fa-2x fa-fw ${legislator.party}`}></i>
            </a>)
    } else legTwit = '';
    let legFb;
    if (legislator.hasOwnProperty('facebook_id') && legislator.facebook_id !== null) {
      legFb = (<a href={`https://www.facebook.com/${legislator.facebook_id}`} target='_blank'>
              <i className={`fa fa-facebook fa-2x fa-fw ${legislator.party}`}></i>
            </a>)
    } else legFb = '';
    let legTube;
    if (legislator.hasOwnProperty('youtube_id') && legislator.youtube_id !== null){
      legTube = (<a href={`https://www.youtube.com/user/${legislator.youtube_id}`} target='_blank'>
              <i className={`fa fa-youtube fa-2x fa-fw ${legislator.party}`}></i>
            </a>)
    } else legTube = '';

    return (
        <div className='overlay-container'>
          <div className='meta'>
            <span className='close' onClick={this.props.closeModal}>
              <i className='fa fa-times fa-fw'></i>
            </span>
          </div>

          <div className='baseinfo'>
            <div className='position'>
              <h3>{legislator.chamber.toUpperCase()}</h3>
            </div>
            <div className='st-dst'>
              <h3>{legislator.state_name} {(legislator.district !== null) ? `, District ${legislator.district}` : ''}</h3>
            </div>
            <div className='phn'>
              <h3>{legislator.phone}</h3>
            </div>
            <div className='addr'>
              {legSite} {legTwit} {legFb} {legTube}
            </div>

          </div>

          <div className='bio-contact'>
            <div>
              <h3>{legislator.first_name} {legislator.last_name}</h3>
              <img src={`https://theunitedstates.io/images/congress/225x275/${legislator.bioguide_id}.jpg`} alt={`${legislator.first_name} ${legislator.last_name}`}/>
            </div>
            <div>
              {(legislator.hasOwnProperty('bio')) ? legislator.bio : 'Biography coming soon!'}
            </div>
            <div>
              Contact info of some kind goes here.
              Also those base vote stats -- about how often they vote along party lines & so on, etc.
            </div>
          </div>
          <div className='votes'>
            <div className='votecontainer'>

              {this.listVotes(modalInfo.recent_votes)}

            </div>

          </div>
      </div>
    )
  }
}

export default Modal;