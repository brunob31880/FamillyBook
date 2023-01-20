import { SET_RICHTEXT_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  richtext: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const richtext = (state = initialState, action) => {
  switch (action.type) {
    case SET_RICHTEXT_LIST:
      if (action.list) {
        return {
          ...state,
          richtext: action.list,
        };
      } else return state;
    default:
      return state;
  }
};

export default richtext;
