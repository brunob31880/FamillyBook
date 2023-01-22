import { combineReducers } from 'redux';

import user from "./user";
import link from './link';
import richtext from './richtext';
import category from './category';
import book from './book';
import theme from './theme';
import dimension from './dimension';
/**
 * 
 */
const rootReducer=combineReducers(
   {
    user,link,richtext,category,book,theme,dimension
   })
export default rootReducer;
