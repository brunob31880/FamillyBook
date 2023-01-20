import { SET_CATEGORY_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  category: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const category= (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      if (action.list) {
        return {
          ...state,
          category: action.list,
        };
      } else return state;
    default:
      return state;
  }
};

export default category;