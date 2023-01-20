import React, { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";

import { Button } from "react-materialize";
import { connect } from "react-redux";
import "./richtext.css";
import "materialize-css";
/**
 *
 * @returns
 */
const ConnectedRichText = (props: any) => {
  const { user, object,handleContextMenu } = props;
  let navigation = useNavigate();
  /**
   * 
   * @param id 
   */
  const handleOnClick=(id)=>{
    console.log("Clic on "+id)
    navigation("/ProtoBook/create_richtext/edit/"+id);
  }


  /**
   *
   */
  return (
    <div onContextMenu={handleContextMenu} className="colu">
      <p>{object.title}</p>   
        <div className="img-container">
          {object.vignette && (
            <img
              className="fit-picture"
              src={object.vignette.url}
              onClick={()=>handleOnClick(object.objectId)}
            ></img>
          )}
        </div>
        <Button
       flat
        node="button"
        tooltip={object.title}
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

const RichText = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRichText);

export default RichText;
