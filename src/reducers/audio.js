import { SET_AUDIO_LIST } from "../constants/action-type";
import Logger from "../logging/Logger";

let logger = Logger.getInstance();

//

const initialState = {
  audio: [],
};
/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
const video= (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_LIST:
      if (action.audios) {
        return {
          ...state,
          audio: action.audios,
        };
      } else return state;
    default:
      return state;
  }
};

export default video;