import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { getListName,getList } from "../../utility/CategoryListUtils";
//import { toPng, toJpeg } from "html-to-image";
import format from "date-fns/format";
import Pdf from "react-to-pdf";
import { Button, Icon } from "react-materialize";
import { SlateEditor } from "../SlateEditor/Editor";
import "./CreateRichText.css";
import { Portal } from "../../components/Portal/Portal";
import { isConnected } from "../../utility/UserUtils";
import { Preloader } from "react-materialize";
/**
 *
 * @returns
 */
const ConnectedCreateRichText = (props: any) => {
  const { user, value,category,iniCategory } = props;
  const [saving, setSaving] = useState(false);
  let { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  let contentValue = useRef(value);
  let categorySelected=useRef(category[0]);
  let navigation = useNavigate();
  /**
   *
   */
  const onDone = () => {
    setSaving(false);
    if (user && user.username) {
      navigation("/ProtoBook/richtext");
    }
  };
  const onCancel = () => {
    navigation("/ProtoBook/richtext");
  };
  /**
   *
   * @param title
   * @param dataUrl
   */
  const modOrCreateRichText = (title, dataUrl) => {
 
    if (value && id)
      props.onModRichText(id, title, categorySelected.current,contentValue.current, dataUrl, onDone);
    else props.onCreateRichText(title,categorySelected.current, contentValue.current, dataUrl, onDone);

  };

  /**
   *
   */
  const onSave = () => {
    setSaving(true);
    let title = contentValue.current[0]["children"][0]["children"][0]["text"];
    htmlToImage
      .toPng(document.getElementById("my-node"))
      .then(function (dataUrl) {
        modOrCreateRichText(title, dataUrl);
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
   * @param fileType
   * @returns
   */
  const getFileName = (fileType: string) =>
    `${format(new Date(), "'SomeName-'HH-mm-ss")}.${fileType}`;

  /**
   *
   */
  const atChange = (value) => {
    contentValue.current = value;
    console.log("At Change=" + contentValue.current);
  };

  return (
    <>
      <motion.div
        className="container-richtext"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="slate-editor">
          <SlateEditor
            ref={ref}
            givenValue={value}
            atChange={(value) => atChange(value)}
            iniCategorySelected={iniCategory}
            categoryRichTextList={getListName(getList(category,"RichText"))}
            handleCategorySelect={(cat)=>{
              console.log("Selecting category ="+cat);
              categorySelected.current=cat}
            }
          />
        
        </div>
        <div className="controls">
          <Button className="btn" onClick={onSave}>
            {!id ? "Create" : "Modify"}
            <Icon left>save</Icon>
          </Button>
          <Button className="btn" onClick={onCancel}>
            Cancel
            <Icon left>cancel</Icon>
          </Button>
          <Pdf
            targetRef={ref}
            filename={`${getFileName("pdf")}`}
            x={10}
            y={10}
            scale={0.4}
          >
            {({ toPdf }) => (
              <Button className="btn" onClick={toPdf}>
                Generate pdf
                <Icon left>picture_as_pdf</Icon>
              </Button>
            )}
          </Pdf>
        </div>
      </motion.div>
      {saving && (
        <Portal>
          <Preloader active color="blue" flashing={false} size="big" />
        </Portal>
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
    category: state.category.category,
  };
};

const CreateRichText = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreateRichText);

export default CreateRichText;
