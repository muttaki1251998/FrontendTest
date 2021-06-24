import React from 'react';
import axios from 'axios';
import '../css/app.css';
import ActivityDetail from './ActivityDetail';
import { MdCallMissed, MdCallReceived } from 'react-icons/md';
import { BiVoicemail } from 'react-icons/bi';



class ActivityFeed extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activities: []
    }
  }

  componentDidMount() {
    axios.get('https://aircall-job.herokuapp.com/activities')
      .then(res => {
        const feed = res.data;
        this.setState({ activities: feed });
        console.log(feed);
      });
  }

  getDetails(id) {
    axios.get(`https://aircall-job.herokuapp.com/activities/:${id}`)
      .then(res => {
        <ActivityDetail detail={res.data} />
      });
  }
  

  convertTime(time) {
    return time.substring(time.lastIndexOf('T') + 1, time.lastIndexOf(":"))
  }

  handleCallType(callType) {
    const missedCall = {
      color: 'red',
      fontSize: '15px'
    }
    const  answeredCall = {
      color: 'green',
      fontSize: '15px'
    }
    const voicemailCall = {
      color:  'black',
      fontSize: '15px'
    }

    if(callType === "missed") {
      return <MdCallMissed style={missedCall}/>
    }
    else if(callType === "answered") {
      return <MdCallReceived style={answeredCall}/>
    }
    else if(callType === "voicemail") {
      return <BiVoicemail style={voicemailCall}/>
    }
  }

  render() {
    return (
      <div className="container-view">
        {this.state.activities.map(activity =>
            <div  className="content" key={activity.id}>
            <div className="signs">{this.handleCallType(activity.call_type)}</div>
            <div className="phone-number">{activity.from}</div>
            <div className="time">{this.convertTime(activity.created_at)}</div>
          </div>
        )}
      </div>
    );
  }
}

export default ActivityFeed;
