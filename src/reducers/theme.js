import { SET_THEME_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  theme: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const theme = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_THEME_LIST:
      console.log("setting theme list");
      if (action.list) {
        return {
          ...state,
          theme: action.list,
        };
      } else return state;
    default:
      return state;
  }
};

export default theme;
