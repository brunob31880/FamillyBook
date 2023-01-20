import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { Button, Icon } from "react-materialize";
import "./Header.css";
/**
 *
 * @returns
 */
const ConnectedHeader = (props: any) => {
  const { user, action } = props;
  const panelLink = {
    "1": { link: "create", icon: "add", road: "create_link" },
    "2": { link: "Documents", icon: "library_books", road: "richtext" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "library_books", road: "books" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelRichText = {
    "1": { link: "create", icon: "add", road: "create_richtext" },
    "2": { link: "links", icon: "insert_link", road: "links" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "Book", icon: "library_books", road: "books" },
    "5": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelHome = {
    "1": { link: "links", icon: "insert_link", road: "links" },
    "2": { link: "Documents", icon: "text_fields", road: "richtext" },
    "3": { link: "Book", icon: "library_books", road: "books" },
    "4": { link: "leave", icon: "directions_run", road: "leave" },
  };
  const panelBook = {
    "1": { link: "links", icon: "insert_link", road: "links" },
    "2": { link: "Documents", icon: "text_fields", road: "richtext" },
    "3": { link: "Home", icon: "home", road: "home" },
    "4": { link: "leave", icon: "directions_run", road: "leave" },
  };

  const isRoot = () => user && user.privilege === "root";

 // console.log("Location " + JSON.stringify(location));
  /**
   *
   * @param page
   */
  const getContextButtons = () => {
    let tab = { "1": { link: "leave", icon: "directions_run", road: "leave" } };
    console.log(
      "Get Buttons for page " + JSON.stringify(useLocation().pathname)
    );
    if (useLocation().pathname.includes("/ProtoBook/links"))
      tab = { ...panelLink };
    else if (useLocation().pathname.includes("/ProtoBook/richtext"))
      tab = { ...panelRichText };
    else if (useLocation().pathname.includes("/ProtoBook/books"))
      tab = { ...panelBook };
    else if (useLocation().pathname === "/ProtoBook/home")
      tab = { ...panelHome };
    else
      console.log("can't find a configuration for " + useLocation().pathname);
    // console.log("Tab=" + JSON.stringify(tab));
    return Object.entries(tab).map(([key, but]) => (
      <Button
        key={key}
        className={isRoot() ? "btn" : "btn disabled"}
        node="button"
        style={{
          marginRight: "5px",
        }}
        waves="light"
        onClick={() => action(but.road)}
      >
        {but.link}
        <Icon style={{ lineHeight: "inherit" }} left>
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
  };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

export default Header;
