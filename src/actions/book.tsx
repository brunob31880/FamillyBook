import { SET_BOOK_LIST} from "../constants/action-type";
/**
 * 
 * @param list 
 * @returns 
 */
export function setBookList(list) {
  return { type: SET_BOOK_LIST, list };
}
