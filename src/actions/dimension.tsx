import { SET_DOCUMENT_DIMENSION} from "../constants/action-type";
/**
 * 
 * @param dimension 
 * @returns 
 */
export function setDocumentDimension(dimension) {
  return { type: SET_DOCUMENT_DIMENSION, dimension };
}
