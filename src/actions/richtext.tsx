import { SET_RICHTEXT_LIST } from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setRichTextList(list) {
  return { type: SET_RICHTEXT_LIST, list };
}
