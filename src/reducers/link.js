import { SET_LINK_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  link: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const link= (state = initialState, action) => {
  switch (action.type) {
    case SET_LINK_LIST:
      if (action.list) {
        return {
          ...state,
          link: action.list,
        };
      } else return state;
    default:
      return state;
  }
};

export default link;
