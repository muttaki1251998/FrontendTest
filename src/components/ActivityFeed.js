import React from 'react';
import '../css/app.css';
import { fetch_activities } from '../actions';
import { connect } from 'react-redux';
import { MdCallMissed, MdCallReceived } from 'react-icons/md';
import { BiVoicemail } from 'react-icons/bi';
import { Link } from 'react-router-dom';

class ActivityFeed extends React.Component {

  componentDidMount() {
    this.props.fetch_activities();
  }


  convertTime(time) {
    return time.substring(time.lastIndexOf('T') + 1, time.lastIndexOf(":"))
  }

  handleCallType(callType) {
    const missedCall = {
      color: 'red',
      fontSize: '15px'
    }
    const answeredCall = {
      color: 'green',
      fontSize: '15px'
    }
    const voicemailCall = {
      color: 'black',
      fontSize: '15px'
    }

    if (callType === "missed") {
      return <MdCallMissed style={missedCall} />
    }
    else if (callType === "answered") {
      return <MdCallReceived style={answeredCall} />
    }
    else if (callType === "voicemail") {
      return <BiVoicemail style={voicemailCall} />
    }
  }

  renderStuffs() {
    return this.props.activities.map(activity => {
      if (activity.is_archived === false) {
        return (
          <div key={activity.id}>
            <Link to={`/detail/${activity.id}`} style={{ textDecoration: 'none' }} >
              <div className="content">
                <div className="signs">{this.handleCallType(activity.call_type)}</div>
                <div className="phone-number">{activity.from}</div>
                <div className="time">{this.convertTime(activity.created_at)}</div>
              </div>
            </Link>
            
          </div>
        );
      }else {
        return null;
      }
    })
  }


  render() {

    console.log(this.props.activities);
    if (!this.props.activities) {
      return <div>Loading</div>
    }

    return (
      <div className="container-view">
        {this.renderStuffs()}        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { activities: Object.values(state.details) }
}

export default connect(mapStateToProps, { fetch_activities })(ActivityFeed);
