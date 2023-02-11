import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import CreateBook from "./CreateBook";
import { isConnected } from "../../utility/UserUtils";
/**
 *
 * @returns
 */
const ConnectedWrapperCreateBook = (props: any) => {
  const { user, book } = props;
  /*Le contenu */
  const [value, setValue] = useState([]);

  let { id } = useParams();

  /**
   *
   */
  useEffect(() => {
    if (id && book) {
      console.log("ID=" + id);
      let find = book.filter((object: any) => object.objectId === id);
      if (find && find.length > 0) {
        console.log("Find=" + JSON.parse(JSON.stringify(find[0])));
        setValue(JSON.parse(JSON.stringify(find[0])));
      }
    }
  }, [book, id]);
  let navigation = useNavigate();
  //create a useEffect hook looking at user and use isConnected function to check if the user is connected
  //if not, redirect to the login page
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);

  return <>{<CreateBook value={value} onModBook={props.onModBook} />}</>;
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
    book: state.book.book,
  };
};

const WrapperCreateBook = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWrapperCreateBook);

export default WrapperCreateBook;
