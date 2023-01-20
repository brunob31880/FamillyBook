import React, { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Icon, TextInput } from "react-materialize";
import {isConnected} from "../../utility/UserUtils";
import "./CreateLink.css";
import { getName } from "../../utility/CategoryListUtils";
/**
 *
 * @returns
 */
const ConnectedCreateLink = (props: any) => {
  const hiddenFileInput = React.useRef(null);
  const { user, link, category, value } = props;
  const [saving, setSaving] = useState(false);
  let { id } = useParams();

  const [state, setState] = useState({
    name: "",
    descriptif: "",
    url: "",
    file: null,
    category: "",
  });

  useEffect(() => {
    console.log("Update value");
    if (!value) return;
    setState({
      name: value.name ? value.name : "",
      descriptif: value.descriptif ? value.descriptif : "",
      url: value.url ? value.url : "",
      file: value.vignette
        ? value.vignette
        : {
            name: "",
          },
      category: value.category ? value.category : "",
    });
    //console.log("Categorie " + value.categorie);
    console.log(value.vignette);
    let optionSelected = document.getElementById("opt_" + value.category);
    if (optionSelected) optionSelected.setAttribute("selected", "selected");
  }, [value]);
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

   //create a useEffect hook looking at user and use isConnected function to check if the user is connected
  //if not, redirect to the login page
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);
  /**
   *
   * @param event
   */
  const handleChangeDescriptif = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      descriptif: target.value,
    });
  };
  /**
   *
   * @param event
   */
  const handleChangeUrl = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      url: target.value,
    });
  };

  /**
   *
   * @param event
   */
  const handleChangeCategorie = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      category: target.value,
    });
  };

  let navigation = useNavigate();
  /**
   *
   */
  const onDone = () => {
    setSaving(false);
    if (user && user.username) {
      navigation("/ProtoBook/links");
    }
  };
  /**
   *
   * @param e
   */
  const handleCancel = (e: SyntheticEvent) => {
    navigation("/ProtoBook/links");
  };
  /**
   *
   * @param event
   */
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let target = event.target as HTMLInputElement;
    setSaving(true);
    if (value && value.objectId !== "")
      props.onModProto(
        value.objectId,
        state.name,
        state.descriptif,
        state.url,
        state.file,
        state.category,
        onDone
      );
    else
      props.onCreateProto(
        state.name,
        state.descriptif,
        state.url,
        state.file,
        state.category,
        onDone
      );
  };
  /**
   *
   */
  const getOptionsCategory = () => {
    
    let obj = category.filter((object: any) => object.name === "Links")[0];
    let catLinks: any= obj ? obj.list : [];
    let tmp = [];
    catLinks.forEach((object) => {
      let nameObject = getName(object);
      tmp.push(
        <option id={"opt_" + nameObject} key={nameObject}>
          {nameObject}
        </option>
      );
    });
    return tmp;
  };
  /**
   *
   * @returns
   */
  const getSelectCategory = () => {
    return (
      <select
        id="select-category"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: "1px solid #f2f2f2",
        }}
        onChange={handleChangeCategorie}
      >
        <option value="" disabled selected>
          Choose your categorie
        </option>
        {getOptionsCategory()}
      </select>
    );
  };
  /**
   *
   * @param event
   */
  const handleFile = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    console.log(target.files)
    setState({
      ...state,
    //  file: hiddenFileInput.current.files[0],
    file: target.files[0]
    });
  };
  /**
   *
   * @returns
   */
  const getVignette = () => {
    if (state && state.file) {
      return (
        <div className="vignette-view">
          <img
            style={{ width: "100%", height: "100px" }}
            src={state.file.url}
          />
        </div>
      );
    } else return <></>;
  };
  /**
   *
   * @returns
   */
  const getIcon = () => {
    if (value) return <Icon left>mode_edit</Icon>;
    else return <Icon left>save</Icon>;
  };
  /**
   *
   */
  return (
    <motion.form
      className="m-login-form"
      //onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="link_title">
        <h3>Lien</h3>
      </div>
      <div className="input-field ">
        <i className="material-icons prefix">account_circle</i>
        <input
          id="Name"
          type="text"
          onChange={handleChangeName}
          placeholder="Name"
          value={state.name}
        />
        <label htmlFor="Name">Name</label>
      </div>
      <div className="input-field ">
        <i className="material-icons prefix">mode_edit</i>
        <input
          id="Descriptif"
          onChange={handleChangeDescriptif}
          type="text"
          placeholder="Descriptif"
          value={state.descriptif}
        />
        <label htmlFor="Descriptif">Descriptif</label>
      </div>
      <div className="input-field ">
        <i className="material-icons prefix">insert_link</i>
        <input
          id="Url"
          onChange={handleChangeUrl}
          type="text"
          placeholder="url"
          value={state.url}
        />
        <label htmlFor="Url">Url</label>
      </div>

      {getVignette()}

      <TextInput
        label="File"
        type="file"
        ref={hiddenFileInput}
        onChange={handleFile}
        placeholder="file"
      />

      <div>
        <label>Categorie</label>
        {getSelectCategory()}
      </div>
      <div className="link_controls">
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
          <Icon left>cancel</Icon>
        </Button>
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
          onClick={(e) => handleSubmit(e)}
        >
          {!value ? "Create" : "Modify"}
          {getIcon()}
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

const CreateLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateLink);

export default CreateLink;
