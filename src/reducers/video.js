import { SET_VIDEO_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  video: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const video= (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_LIST:
      if (action.videos) {
        return {
          ...state,
          video: action.videos,
        };
      } else return state;
    default:
      return state;
  }
};

export default video;