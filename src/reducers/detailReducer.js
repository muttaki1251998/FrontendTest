import _ from "lodash";
import { SHOW_DETAILS, FETCH_ACTIVITIES } from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case SHOW_DETAILS:
      return { ...state, [action.payload.id]: action.payload}
    case FETCH_ACTIVITIES:
      return {...state, ..._.mapKeys(action.payload, 'id') } 
    default:
      return state;
  }
}