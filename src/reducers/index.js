import { combineReducers } from 'redux';

import user from "./user";
import link from './link';
import richtext from './richtext';
import category from './category';
import book from './book';
import theme from './theme';
/**
 * 
 */
const rootReducer=combineReducers(
   {
    user,link,richtext,category,book,theme
   })
export default rootReducer;
