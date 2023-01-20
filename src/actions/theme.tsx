import { SET_THEME_LIST} from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setThemeList(list) {
  return { type: SET_THEME_LIST, list };
}
