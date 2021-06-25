import React from 'react';
import { showDetails } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdCallMissed, MdCallReceived } from 'react-icons/md';
import { BiVoicemail, BiArrowBack } from 'react-icons/bi';
import '../css/detail.css';

class ActivityDetail extends React.Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.showDetails(id);
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

  convertTime(time) {
    return time.substring(time.lastIndexOf('T') + 1, time.lastIndexOf(":"))
  }

  getDate(date) {
    return date.substring(0, 10);
  }

  convertDuration(duration) {
    const time = parseInt(duration)
    if (time >= 60) {
      const res = time / 60 + "m";
      return <div>{res}</div>
    }
    else {
      const res = time + "s";
      return <div>{res}</div>
    }
  }

  toAvailability() {
    if (this.props.detail.to === null)
      return <span>Not available</span>
    else
      return <span>{this.props.detail.to}</span>
  }


  render() {
    if (!this.props.detail) {
      return <div>Loading</div>
    }

    return (
      <div>
        <Link to="/" className="icon">
          <BiArrowBack />
        </Link>
        <div className="detail-container">
          <div id="1">{this.handleCallType(this.props.detail.call_type)}<span>{this.props.detail.from}</span></div>       
          <div id="2"></div>
          <div id="3">{this.convertDuration(this.props.detail.duration)}</div>
          <div id="4">{this.getDate(this.props.detail.created_at)}</div>
          <div id="5">From: {this.props.detail.from}</div>
          <div id="6">To: {this.toAvailability()}</div>       
          <div id="7">Via: {this.props.detail.via}</div>
        </div>
      
      </div>
      );
  }

}
const mapStateToProps = (state, ownProps) => {
  return { detail: state.details[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { showDetails })(ActivityDetail);