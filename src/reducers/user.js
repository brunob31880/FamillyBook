import { SET_USER } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  user: null,
};
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.user) {
        logger.info("user", action.user);

        return {
          ...state,

          user: action.user,
        };
      } else return state;
    default:
      return state;
  }
};

export default user;
