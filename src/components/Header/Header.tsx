import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { Button, Icon } from "react-materialize";
import { isMobileDevice } from "../../utility/DeviceUtils"
import "./Header.css";
/**
 *
 * @returns
 */
const ConnectedHeader = (props: any) => {
  const { user, action, dimension } = props;
  const panelLink = {
    "1": { link: "create", icon: "add", road: "create_link" },
    "2": { link: "Docs", icon: "library_books", road: "richtext" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "book", road: "books" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelRichText = {
    "1": { link: "create", icon: "add", road: "create_richtext" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "book", road: "books" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelHome = {
    "1": { link: "links", icon: "insert_link", road: "links" },
    "2": { link: "Docs", icon: "text_fields", road: "richtext" },
    "3": { link: "Book", icon: "book", road: "books" },
    "4": { link: "Audio", icon: "audiotrack", road: "audios" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelBook = {
    "1": { link: "create", icon: "add", road: "create_book" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Docs", icon: "text_fields", road: "richtext" },
    "4": { link: "Home", icon: "home", road: "home" },
    "5": { link: "Audio", icon: "audiotrack", road: "audios" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
  };

  const panelAudio = {
    "1": { link: "create", icon: "add", road: "create_audio" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Docs", icon: "text_fields", road: "richtext" },
    "4": { link: "Home", icon: "home", road: "home" },
    "5": { link: "Book", icon: "library_books", road: "books" },
    "6": { link: "leave", icon: "directions_run", road: "leave" },
  };
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
      tab = { ...panelLink };
    else if (useLocation().pathname.includes("/ProtoBook/richtext"))
      tab = { ...panelRichText };
    else if (useLocation().pathname.includes("/ProtoBook/books"))
      tab = { ...panelBook };
    else if (useLocation().pathname === "/ProtoBook/home")
      tab = { ...panelHome };
    else if (useLocation().pathname.includes("/ProtoBook/audios"))
      tab = { ...panelAudio };
    else
      console.log("can't find a configuration for " + useLocation().pathname);
    // console.log("Tab=" + JSON.stringify(tab));
    return Object.entries(tab).map(([key, but]) => (
      <Button
        key={key}
        className={isRoot() ? "btn" : "btn disabled"}
        node="button"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
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
