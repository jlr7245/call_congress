import React, {PropTypes} from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const Legislator = (props) => {
  let leg = props.leg;
  /* remember to put in the bit where they can remove from watchlist */
  /// legislator socials ///
  let legSite;
  if (leg.hasOwnProperty('website') && leg.website !== null) {
    legSite = (<a href={leg.website} target='_blank'>
            <i className={`fa fa-link fa-2x fa-fw ${leg.party}`}></i>
          </a>);
  } else legSite='';
  let legTwit;
  if (leg.hasOwnProperty('twitter_id') && leg.twitter_id !== null) {
    legTwit = (<a href={`https://www.twitter.com/${leg.twitter_id}`} target='_blank'>
            <i className={`fa fa-twitter fa-2x fa-fw ${leg.party}`}></i>
          </a>)
  } else legTwit = '';
  let legFb;
  if (leg.hasOwnProperty('facebook_id') && leg.facebook_id !== null) {
    legFb = (<a href={`https://www.facebook.com/${leg.facebook_id}`} target='_blank'>
            <i className={`fa fa-facebook fa-2x fa-fw ${leg.party}`}></i>
          </a>)
  } else legFb = '';
  let legTube;
  if (leg.hasOwnProperty('youtube_id') && leg.youtube_id !== null){
    legTube = (<a href={`https://www.youtube.com/user/${leg.youtube_id}`} target='_blank'>
            <i className={`fa fa-youtube fa-2x fa-fw ${leg.party}`}></i>
          </a>)
  } else legTube = '';
  /// legislator list-item///
  return (
    <li className={leg.party} key={leg.bioguide_id}>
      <div className='leghead'>
        <img src={`https://theunitedstates.io/images/congress/225x275/${leg.bioguide_id}.jpg`} alt={`${leg.first_name} ${leg.last_name}`}/>
        <div className='headinfo'>
          <span className='chamber'><i className={`fa fa-circle-o fa-2x ${leg.party}`}></i> {leg.chamber}</span>
          <h3>{leg.first_name} {leg.last_name}</h3>
          <span className='represents'>{leg.state_name}</span>
          <p className='currentterm'>Started {moment(leg.term_start).format('MMM d, YYYY')}</p>
          <p className='currentterm'>Ends {moment(leg.term_end).format('MMM d, YYYY')}</p>
        </div>
      </div>
      <div className='legbody'>
        <div className='legadd'>
        <i className='fa fa-map-marker fa-3x'></i>
          <p>{leg.office}<br/>
            Washington DC 20510</p>
        </div>
        <div className='legphn'>
          <i className="fa fa-phone fa-3x"></i>
          <h3>{leg.phone}</h3>
        </div>
        <div className='legsoc'>
        {legSite} {legTwit} {legFb} {legTube}
        </div>
      </div>
      <button onClick={() => props.showModal('leg', leg.bioguide_id)} value='Learn more about this legislator!' />
    </li>
  )
};

export default Legislator;