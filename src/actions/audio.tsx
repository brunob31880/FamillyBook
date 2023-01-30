import { SET_AUDIO_LIST} from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setAudioList(videos) {
  return { type: SET_AUDIO_LIST, videos };
}
