import React, { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import article from '../../assets/article.jpg';
import {isMobileDevice} from "../../utility/DeviceUtils"

import { Button } from "react-materialize";
import { connect } from "react-redux";
import "./richtext.css";
import "materialize-css";
/**
 *
 * @returns
 */
const ConnectedRichText = (props: any) => {
  const { dimension, object,handleContextMenu } = props;
  let navigation = useNavigate();
  /**
   * 
   * @param id 
   */
  const handleOnClick=(id)=>{
    console.log("Clic on "+id)
    navigation("/ProtoBook/create_richtext/edit/"+id);
  }

  const mobileStyle={
    "width":"100px"
  }
  const desktopStyle={
    "width":"150px"
  }
  /**
   *
   */
  return (
    <div onContextMenu={handleContextMenu} className="colu">
      <p>{object.title}</p>   
        <div className="img-container-richtext" style={isMobileDevice(dimension)?mobileStyle:desktopStyle}>
          
            <img
              className="fit-picture"
              style={isMobileDevice(dimension)?mobileStyle:desktopStyle}
              src={article}
              onClick={()=>handleOnClick(object.objectId)}
            ></img>
          
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
    dimension: state.dimension.dimension
  };
};

const RichText = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRichText);

export default RichText;
