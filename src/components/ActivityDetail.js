import React from 'react';
import { showDetails } from '../actions';
import { connect } from 'react-redux';

class ActivityDetail extends React.Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.showDetails(id);
  }

  render() {
    console.log(this.props.detail);
    return(
      <div>ActivityDetail</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { detail: state.details }
}

export default connect(mapStateToProps, { showDetails })(ActivityDetail);