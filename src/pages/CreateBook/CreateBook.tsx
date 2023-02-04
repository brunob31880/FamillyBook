import React, { useState, useEffect, SyntheticEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Icon, Checkbox } from "react-materialize";
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
  const [check, setCheck] = useState(false);
  let { id } = useParams();
  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(
    'https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js'
  );

  const [state, setState] = useState({
    isbn: "",
    result: null,
    result2: null,
    cover: null
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
    if ((state.isbn.length !== 10) && (state.isbn.length !== 13)) return;
    console.log("L=" + state.isbn.length)
    const questions = async () => {
      let result, result2, cover;
      result = await Parse.Cloud.run("fetch_isbn2", { isbn_number: state.isbn })
      result2 = await Parse.Cloud.run("fetch_isbn3", { isbn_number: state.isbn })
      cover = await Parse.Cloud.run("fetch_cover", { isbn_number: state.isbn })
      console.log("Result2 ", result2)
      console.log("Cover ", cover)
      setState({
        ...state,
        result2: result2,
        result: result,
        cover: cover
      });
    }
    questions();
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
    let thumb = state.result["ISBN:" + state.isbn]
    if (thumb.details.subject) props.onCreateBookCategory(thumb.details.subjects, onDoneFinish);
    else onDoneFinish();
  };

  /**
 *
 */
  const onDoneFinish = () => {
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

    let thumb = state.result["ISBN:" + state.isbn]
    let maybe_url = 'https://covers.openlibrary.org/b/isbn/' + state.isbn + '-M.jpg'
    if (value && value.objectId !== "")
      props.onModBook(value.objectId, state.isbn, thumb.details.title, thumb.details.authors, thumb.details.number_of_pages, maybe_url, thumb.details.subjects, onDone);
    else {
      props.onCreateBook(state.isbn, thumb.details.title, thumb.details.authors, thumb.details.number_of_pages, maybe_url, thumb.details.subjects, onDone);
    }
  };


  /**
   *
   * @returns
   */
  const getVignette = () => {
    console.log("Result ", state.result)
    if (state && state.result) {

      let thumb = state.result["ISBN:" + state.isbn]
      let maybe_url = 'https://covers.openlibrary.org/b/isbn/' + state.isbn + '-M.jpg'
      return (
        <div className="vignette-view">
          {thumb && thumb.thumbnail_url && (
            <img
              style={{ width: "50%", height: "50%" }}
              src={maybe_url}
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
          setState({ ...state, isbn: data });
        },
        (err: any) => console.log('err ->', err)
      );
    }
  }, [Html5QrcodeScanner]);

  useEffect(() => {
    //console.log("Ici " + check)
    if (!check) document.getElementById("reader").setAttribute("hidden", "true");
    else document.getElementById("reader").removeAttribute("hidden")
  }, [check])
  /**
   *
   */
  return (
    <motion.form
      className="m-book-form"
      //onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="link_title">
        <h3>Book</h3>
      </div>
      <Checkbox
        id="Checkbox_1"
        label="Scanner"
        value="Scanner"
        onChange={(e) => setCheck(!check)}
      />
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

      {!check && getVignette()}

      <div className="link_controls" style={{ marginTop: "10px" }}>
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
            display: "flex"
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
            display: "flex"
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
