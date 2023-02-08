import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { Button, Icon } from "react-materialize";
import { isMobileDevice } from "../../utility/DeviceUtils"
import {panelAudio,panelHome,panelBook,panelRichText,panelLink} from "../../datas/headerconfig.js"
import './header.css'
/**
 *
 * @returns
 */
const ConnectedHeader = (props: any) => {
  const { user, action, dimension } = props;
  

  const isRoot = () => user && user.privilege === "root";

  const btnStyle = () => (!isMobileDevice(dimension)) ? "btn" : "btn-small"

  // console.log("Location " + JSON.stringify(location));
  /**
   *
   * @param page
   */
  const getContextButtons = () => {
    let tab = { "1": { link: "leave", icon: "directions_run", road: "leave" } };
    /* console.log(
       "Get Buttons for page " + JSON.stringify(useLocation().pathname)
     ); */
    if (useLocation().pathname.includes("/ProtoBook/links"))
      tab = { ...panelLink(dimension) };
    else if (useLocation().pathname.includes("/ProtoBook/richtext"))
      tab = { ...panelRichText(dimension) };
    else if (useLocation().pathname.includes("/ProtoBook/books"))
      tab = { ...panelBook(dimension) };
    else if (useLocation().pathname === "/ProtoBook/home")
      tab = { ...panelHome(dimension) };
    else if (useLocation().pathname.includes("/ProtoBook/audios"))
      tab = { ...panelAudio(dimension) };
    else
      console.log("can't find a configuration for " + useLocation().pathname);
    // console.log("Tab=" + JSON.stringify(tab));
    return Object.entries(tab).map(([key, but]) => (
      <Button
        key={key}
        className={isRoot() ? "btn" : "btn disabled"}
        node="button"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}

        waves="light"
        onClick={() => action(but.road)}
      >
        {!isMobileDevice(dimension) && but.link}
        <Icon style={{ lineHeight: "27px", height: "27px" }}>
          {but.icon}
        </Icon>
      </Button>
    ));
  };

  /**
   *
   */
  return <div className="flexbox">{getContextButtons()}</div>;
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

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

export default Header;
