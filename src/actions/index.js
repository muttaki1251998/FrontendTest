import axios from "axios";
import { SHOW_DETAILS, FETCH_ACTIVITIES } from './types';

export const fetch_activities = () => {
  return async dispatch => {
    const res = await axios.get("https://aircall-job.herokuapp.com/activities");
    dispatch({ type:FETCH_ACTIVITIES, payload: res.data });
  }
}

export const showDetails = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`https://aircall-job.herokuapp.com/activities/${id}`);
    dispatch({ type: SHOW_DETAILS, payload: res.data });
  }
}
