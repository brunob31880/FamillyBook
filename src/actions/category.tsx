import { SET_CATEGORY_LIST } from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setCategoryList(list) {
  return { type: SET_CATEGORY_LIST, list };
}
