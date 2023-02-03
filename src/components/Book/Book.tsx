import React from "react";
import { Button } from "react-materialize";
import { connect } from "react-redux";
import {isMobileDevice} from "../../utility/DeviceUtils"
import { setUser } from "../../actions/user";
/**
 * 
 * @param param0 
 * @returns 
 */
export const ConnectedBook = ({ object, handleContextMenu,dimension }: any) => {
  console.log("Object ", object.thumbnail)

  const mobileStyle={
    "width":"100px"
  }
  const desktopStyle={
    "width":"200px"
  }

  return (
    <div id="img_anchor" onContextMenu={handleContextMenu} className="colu">
      <a target="_blank" href={object.url}>
        <div className="img-container-book"  style={isMobileDevice(dimension)?mobileStyle:desktopStyle}>
          {object.thumbnail && (
            <img
              width="100px"
              height="100px"
              className="fit-picture"
              src={object.thumbnail}
            ></img>
          )}
        </div>
      </a>
      <Button
        flat
        node="button"
        tooltip={object.descriptif}
        tooltipOptions={{ position: "bottom" }}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
          fontWeight: "bold",
          color:"antiquewhite"
        }}
      >
       {object.title}
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

const Book = connect(mapStateToProps, mapDispatchToProps)(ConnectedBook);

export default Book;
