import React, { useState, useEffect, SyntheticEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Icon, Checkbox } from "react-materialize";
import { isConnected } from "../../utility/UserUtils";
import "./createbook.css";
import Parse from "parse/dist/parse.min.js"; //Import parse
/**
 *
 * @returns
 */
const ConnectedCreateBook = (props: any) => {
  const { user, link, category, value, dimension } = props;
  const [saving, setSaving] = useState(false);
  let { id } = useParams();

  const [dataUri, setDataUri] = useState('');
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
    if (state.isbn.length !== 13) return;
    const questions = async () => {
      //let result;
      //result = await Parse.Cloud.run("fetch_isbn2", { isbn_number: state.isbn })
      Parse.Cloud.run("fetch_chasse", { isbn_number: state.isbn }).then(res => {

        var doc = (new DOMParser).parseFromString(res, "text/html");
        console.log(doc)
        let coverImage = doc.getElementById("coverImage") as HTMLImageElement;
        //  let title=doc.getElementById("describe-isbn-title").innerText;
        let title = doc.title.split("(")[0];
        let author = [];
        author.push(doc.title.split('de')[1]);
        let tmp = {
          title,
          author,
          cover: coverImage.src,
          number_of_pages: -1,
          subjects: [""]
        }
        setState({
          ...state,
          result: tmp,
        });
      })

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

    //    if (thumb.details.subject) props.onCreateBookCategory(thumb.details.subjects, onDoneFinish);
    //    else 
    onDoneFinish();
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
    // console.log("Test="+JSON.stringify(state.result))
    if (JSON.stringify(state.result) !== '{}') {

      if (value && value.objectId !== "")
        props.onModBook(value.objectId, state.isbn, state.result.title, state.result.author, state.result.number_of_pages, state.result.cover, state.result.subjects, onDone);
      else {
        props.onCreateBook(state.isbn, state.result.title, state.result.author, state.result.number_of_pages, state.result.cover, state.result.subjects, onDone);
      }
    }


  };

  /**
   *
   * @returns
   */
  const getVignette = () => {
    console.log("State Result ", state.result)
    if (state && state.result) {
      if (JSON.stringify(state.result) !== '{}') {
        return (
          <div className="vignette-view">
            <img
              style={{ width: "50%", height: "50%" }}
              src={state.result.cover}
            />
          </div>
        )
      }
      else return <p>Can't find</p>;
    }
  }

  /**
   *
   * @returns
   */
  const getIcon = () => {
    return <Icon>save</Icon>;
  };


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

      <div className="input-field ">
        <i className="material-icons prefix">bookshelf</i>
        <input
          id="Name"
          type="text"
          onChange={handleChangeISBN}
          placeholder="ISBN"
          value={state.isbn}
          style={{ width: "90%" }}
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
