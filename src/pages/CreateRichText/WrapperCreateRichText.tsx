import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import CreateRichText from "./CreateRichText";

/**
 *
 * @returns
 */
const ConnectedWrapperCreateRichText = (props: any) => {
  const { user, richtext } = props;
  /*Le contenu */
  const [obj, setObj] = useState({
    category: "",
    value: [],
  });

  let { id } = useParams();

  /**
   *
   */
  useEffect(() => {
    if (id && richtext) {
      console.log("ID=" + id);
      let find = richtext.filter((object: any) => object.objectId === id);
      if (find && find.length > 0) {
        //  console.log("CONTENT=" + find[0].content);
        let new_obj = {
          category: find[0].category,
          value: JSON.parse(JSON.stringify(find[0].content)),
        };
        setObj(new_obj);
      }
    }
  }, [richtext, id]);

  return (
    <>
      {obj.value.length > 0 && (
        <CreateRichText value={obj.value} iniCategory={obj.category} onModRichText={props.onModRichText} />
      )}
    </>
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
    richtext: state.richtext.richtext,
  };
};

const WrapperCreateRichText = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWrapperCreateRichText);

export default WrapperCreateRichText;
