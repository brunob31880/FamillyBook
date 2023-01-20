import { SET_LINK_LIST } from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setLinkList(list) {
  return { type: SET_LINK_LIST, list };
}
