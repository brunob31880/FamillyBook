import { SET_VIDEO_LIST} from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setVideoList(videos) {
  return { type: SET_VIDEO_LIST, videos };
}
