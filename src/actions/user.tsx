import { SET_USER} from "../constants/action-type";
//
export function setUser(user) {
  return { type: SET_USER, user };
}
