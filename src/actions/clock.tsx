import { TICK, START_TIMER } from "../constants/action-type"
import moment from "moment";
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const tick = ({ interval }) => {
    let d:Date=new Date()
    return {
        type: TICK,
        date: d.getDate(),
        interval
    }
}
//
//  
//
export const startTimer = () => {
    return (dispatch, getState) => {
        dispatch({type: START_TIMER });
        clearInterval(getState.interval);
        const interval = setInterval(() => {
            dispatch(tick({ interval }))
           
        }, 1000)
    }
}
