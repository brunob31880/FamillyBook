import { SET_VIDEO_LIST} from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setVideoList(list) {
  return { type: SET_VIDEO_LIST, list };
}
