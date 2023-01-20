import React, { useState, useEffect, SyntheticEvent } from "react";

import { setUser } from "../../actions/user";
import "materialize-css";
import { Button } from "react-materialize";
import { connect } from "react-redux";
import "./link.css";

/**
 *
 * @returns
 */
const ConnectedLink = (props: any) => {
  const { user, object, handleContextMenu } = props;

  /**
   *
   */
  return (
    <div id="img_anchor" onContextMenu={handleContextMenu} className="colu">
      <a target="_blank" href={object.url}>
        <div className="img-container">
          {object.vignette && (
            <img className="fit-picture" src={object.vignette.url}></img>
          )}
        </div>
      </a>
      
      <Button
       flat
        node="button"
        tooltip={object.descriptif}
        tooltipOptions={{
          position: "bottom",
        }}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          fontWeight: "bold",
          color:"antiquewhite"
        }}
      >
        {object.name}
        
      </Button>
    </div>
  );
};

/**
 *
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
};
/**
 *
 * @param state
 * @returns
 */
const mapStateToProps = (state: any) => {
  return {
    user: state.user.user,
  };
};

const Link = connect(mapStateToProps, mapDispatchToProps)(ConnectedLink);

export default Link;
