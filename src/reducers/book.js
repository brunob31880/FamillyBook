import { SET_BOOK_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  book: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const book= (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_LIST:
      if (action.list) {
        return {
          ...state,
          book: action.list,
        };
      } else return state;
    default:
      return state;
  }
};

export default book;