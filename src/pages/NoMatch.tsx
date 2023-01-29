import React from "react";
import { useLocation } from 'react-router-dom'
/**
 * 
 * @returns 
 */
export const NoMatch = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
        <h2 style={{color:"white"}}>The page {location.pathname} does not exist </h2>
    </div>
  )
};
