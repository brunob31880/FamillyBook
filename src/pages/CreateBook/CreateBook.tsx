import React, { useState, useEffect, SyntheticEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Icon } from "react-materialize";
import { isConnected } from "../../utility/UserUtils";
//import { AudioRecorder } from 'react-audio-voice-recorder';
import { useHtml5QrCodeScanner } from 'react-html5-qrcode-reader';
import { isMobileDevice } from "../../utility/DeviceUtils";
import "./createbook.css";

import Parse from "parse/dist/parse.min.js"; //Import parse
/**
 *
 * @returns
 */
const ConnectedCreateBook = (props: any) => {
  const { user, link, category, value, dimension } = props;
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState("Not Found");
  let { id } = useParams();
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(
    'https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js'
  );

  const [state, setState] = useState({
    isbn: "",
    result: null,
  });

  useEffect(() => {
    console.log("Update value");
    if (!value) return;
    setState({
      ...state,
      isbn: value.name ? value.name : "",
    });
  }, [value]);
  /**
   *
   * @param event
   */
  const handleChangeISBN = (event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      isbn: target.value,
    });
  };

  useEffect(() => {
    //"0735619670"
    if (!state.isbn) return;
    if (state.isbn.length < 10) return;
    Parse.Cloud.run("fetch_isbn", { isbn_number: state.isbn }).then(function (
      result
    ) {
      console.log("resultat ", result);
      // const {imageLinks}=result;
      // const {thumbnail}=imageLinks;
      // console.log("thumbnail ", thumbnail);
      setState({
        ...state,
        result: result,
      });
    });
  }, [state.isbn]);
  /**
   * 
   */
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);

  let navigation = useNavigate();
  /**
   *
   */
  const onDone = () => {
    setSaving(false);
    if (user && user.username) {
      navigation("/ProtoBook/books");
    }
  };
  /**
   *
   * @param e
   */
  const handleCancel = (e: SyntheticEvent) => {
    navigation("/ProtoBook/books");
  };
  /**
   *
   * @param event
   */
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let target = event.target as HTMLInputElement;
    setSaving(true);
    const { imageLinks, title, authors, pageCount } = state.result;
    const { thumbnail } = imageLinks;
    if (value && value.objectId !== "")
      props.onModBook(value.objectId, state.isbn, title, authors, pageCount, thumbnail, onDone);
    else {

      props.onCreateBook(state.isbn, title, authors, pageCount, thumbnail, onDone);
    }
  };


  /**
   *
   * @returns
   */
  const getVignette = () => {
    if (state && state.result) {
      return (
        <div className="vignette-view">
          {state.result.imageLinks && state.result.imageLinks.thumbnail && (
            <img
              style={{ width: "100%", height: "100px" }}
              src={state.result.imageLinks.thumbnail}
            />
          )}
        </div>
      );
    } else return <></>;
  };
  /**
   *
   * @returns
   */
  const getIcon = () => {
    if (value) return <Icon>mode_edit</Icon>;
    else return <Icon>save</Icon>;
  };
  /*
    const addAudioElement = (blob) => {
      { isMobileDevice(dimension) && <AudioRecorder onRecordingComplete={addAudioElement} />}
      const url = URL.createObjectURL(blob);
      console.log("Audio URL: ", url);
      const audio = document.createElement("audio");
      audio.src = url;
      audio.controls = true;
      document.body.appendChild(audio);
    };
  */
  useEffect(() => {
    console.log("Scanner is ready")
    if (Html5QrcodeScanner) {
      // Creates anew instance of `HtmlQrcodeScanner` and renders the block.
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 200, height: 200 } },
          /* verbose= */ false);
      html5QrcodeScanner.render(
        (data: any) => {
          console.log('success ->', data)
          setState({...state,isbn:data});
        },
        (err: any) => console.log('err ->', err)
      );
    }
  }, [Html5QrcodeScanner]);
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
        <h3>Book</h3>
      </div>
      <div id='reader'></div>
      <div className="input-field ">
        <i className="material-icons prefix">bookshelf</i>
        <input
          id="Name"
          type="text"
          onChange={handleChangeISBN}
          placeholder="ISBN"
          value={state.isbn}
        />
        <label htmlFor="ISBN">ISBN</label>
      </div>

      {getVignette()}

      <div className="link_controls" style={{ marginTop: "10px" }}>
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
            display:"flex"
          }}
          waves="light"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
          <Icon>cancel</Icon>
        </Button>

        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
            display:"flex"
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
    dimension: state.dimension.dimension,
  };
};

const CreateBook = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateBook);

export default CreateBook;
