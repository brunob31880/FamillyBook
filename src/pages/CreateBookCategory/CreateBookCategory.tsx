import React, { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { IconPicker } from "react-fa-icon-picker";
import { Button } from "react-materialize";
import "./CreateBookCategory.css";
/**
 *
 * @returns
 */
const ConnectedCreateBookCategory = (props: any) => {
  const hiddenFileInput = React.useRef(null);
  const { user, link, category } = props;
  const [state, setState] = useState({
    name: "",
    icon: null,
  });
  useEffect(() => {}, []);
  /**
   *
   * @param event
   */
  const handleChangeName = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      name: target.value,
    });
  };
  /**
   *
   * @param icon_target
   */
  const handleChangeIcon = (icon_target: String) => {
    console.log("Icon:" + icon_target);
    setState({
      ...state,
      icon: icon_target,
    });
  };
  let navigation = useNavigate();
  /**
   *
   */
  const onDone = () => {
    if (user && user.username) {
      navigation("/ProtoBook/books");
    }
  };
  /**
   *
   * @param event
   */
  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    navigation("/ProtoBook/books");
  };
  /**
   *
   * @param event
   */
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let target = event.target as HTMLInputElement;
    props.onCreateBookCategory(state.name, state.icon, onDone);
  };

  /**
   *
   */
  return (
    <motion.form
      className="m-book-category-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>Categorie</h3>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          onChange={handleChangeName}
          placeholder="Name"
          style={{ marginRight: "5px" }}
        />
        <IconPicker hideSearch={false}  value={state.icon} onChange={(v) => handleChangeIcon(v)} />
      </div>
      <div className="link_controls">
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
            marginTop: "5px",
          }}
          waves="light"
          onClick={(e) => handleSubmit(e)}
        >
          Create
        </Button>
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
            marginTop: "5px",
          }}
          waves="light"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
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
    link: state.link.link,
    category: state.category.category,
  };
};

const CreateBookCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateBookCategory);

export default CreateBookCategory;
