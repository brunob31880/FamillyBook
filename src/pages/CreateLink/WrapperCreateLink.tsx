import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import CreateLink from "./CreateLink";
import { isConnected } from "../../utility/UserUtils";
/**
 *
 * @returns
 */
const ConnectedWrapperCreateLink = (props: any) => {
  const { user, link } = props;
  /*Le contenu */
  const [value, setValue] = useState([]);

  let { id } = useParams();

  /**
   *
   */
  useEffect(() => {
    if (id && link) {
      console.log("ID=" + id);
      let find = link.filter((object: any) => object.objectId === id);
      if (find && find.length > 0) {
        console.log("Find=" + JSON.parse(JSON.stringify(find[0])));
        setValue(JSON.parse(JSON.stringify(find[0])));
      }
    }
  }, [link, id]);
  let navigation = useNavigate();
  //create a useEffect hook looking at user and use isConnected function to check if the user is connected
  //if not, redirect to the login page
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);

  return <>{<CreateLink value={value} onModProto={props.onModProto} />}</>;
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
    link: state.link.link,
  };
};

const WrapperCreateLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWrapperCreateLink);

export default WrapperCreateLink;
