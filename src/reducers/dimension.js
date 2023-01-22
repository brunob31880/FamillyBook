import { SET_DOCUMENT_DIMENSION } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  dimension: null,
};
/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const dimension = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCUMENT_DIMENSION:
      if (action.dimension) {   
        return {
          ...state,
          dimension: action.dimension,
        };
      } else return state;
    default:
      return state;
  }
};

export default dimension;
