import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { setUser } from "../../actions/user";
import { setCategoryList } from "../../actions/category";
import { setRichTextList } from "../../actions/richtext";
import { connect } from "react-redux";
import { ParseClasse, Logout } from "../../utility/ParseUtils";
import Header from "../../components/Header/Header";
import { Icon, Button } from "react-materialize";
import { RichTextList } from "../RichTextList/RichTextList";
import { truncateString } from "../../utility/StringUtils";
import {
  getName,
  getIcon,
  convertCamelCaseStringToHyphenatedString,
} from "../../utility/CategoryListUtils";
import { isConnected } from "../../utility/UserUtils";
import "./richtext.css";
/**
 *
 * @returns
 */
const ConnectedRichTexts = (props: any) => {
  const { category, user, richtext } = props;
  let initialPopup: HTMLDivElement = null;
  let initialEdit: Element = null;
  let initialDel: Element = null;
  let initialType: String = "";
  let initialAction: String = "";
  const initValue = {
    menuPopup: initialPopup,
    edit: initialEdit,
    del: initialDel,
    type: initialType,
    action: initialAction,
  };
  /* reference vers le menu popup normalement actualisée au montage*/
  let refPopup = useRef(initValue);
  let navigation = useNavigate();

  useEffect(() => {
    reLoad();
  }, []);

  const reLoad = () => {
    ParseClasse("RichText", (rep: any) => {
      props.setRichTextList(JSON.parse(JSON.stringify(rep)));
    });
    ParseClasse("Category", (rep: any) => {
      props.setCategoryList(JSON.parse(JSON.stringify(rep)));
    });
  }
  //create a useEffect hook looking at user and use isConnected function to check if the user is connected
  //if not, redirect to the login page
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);

  /**
   *
   * @param action
   */
  const callbackAction = (action: string) => {
    console.log("action " + action);
    if (action === "leave") {
      Logout(() => console.log("Leaving"), props.setUser);
    } else if (user && user.username) {
      navigation("/ProtoBook/" + action);
    }
  };
  /**
   *
   */
  const getNav = () => {
    if (useLocation().pathname === "/ProtoBook/home") return <></>;
    else return <nav>{renderNavigation()}</nav>;
  };
  /**
   *
   * @returns
   */
  const renderNavigation = () => {
    let tmp = [];
    let obj = category.filter((object: any) => object.name === "RichText")[0];
    let catRich: Array<String> = obj ? obj.list : [];
    catRich.forEach((object) => {
      tmp.push(
        <Button
          key={getName(object) as string}
          waves="light"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          className="btn"
          onClick={() => navigation("/ProtoBook/richtext/" + getName(object))}
        >
          {" "}
          {getIcon(object) && <i style={{ marginRight: "5px", lineHeight: "27px", height: "27px" }} className={"fas " + convertCamelCaseStringToHyphenatedString(getIcon(object))} />}
          {truncateString(getName(object), 8)}{" "}
        </Button>
      );
    });
    tmp.push(
      <a className="btn-floating btn-large waves-effect waves-light lightgreen">
        <i
          className="material-icons"
          onClick={() => navigation("/ProtoBook/create_richtext_category")}
        >
          add
        </i>
      </a>
    );
    return tmp;
  };
  //
  const renderListElements = () => {
    let { category } = useParams();

    return (
      <RichTextList
        richtext={richtext}
        uid={user.objectId}
        category={category}
        contextMenuListener={contextMenuListener}
      />
    );
  };
  //
  const onDoneDelete = () => {
    //navigation("/ProtoBook/" + refPopup.current.type);
    reLoad();
  };
  //onEdit
  const onEdit = (e: MouseEvent) => {
    console.log(
      "Edit on " + refPopup.current.type + " " + refPopup.current.action
    );
    navigation(
      "/ProtoBook/create_" +
      refPopup.current.type +
      "/edit/" +
      refPopup.current.action
    );
  };
  //onDel
  const onDel = (e: MouseEvent) => {
    console.log(
      "Del on " + refPopup.current.type + " " + refPopup.current.action
    );
    props.onDeleteType(
      refPopup.current.type,
      refPopup.current.action,
      onDoneDelete
    );
  };
  //contextMenuListener
  const contextMenuListener = (e: MouseEvent, type: String, id: String) => {
    e.preventDefault();
    refPopup.current.menuPopup.style.display = "block";
    refPopup.current.menuPopup.style.top = `${e.clientY}px`;
    refPopup.current.menuPopup.style.left = `${e.clientX}px`;
    refPopup.current.type = type;
    refPopup.current.action = id;
  };
  //useEffect
  useEffect(() => {
    const menuPopup: HTMLDivElement = document.querySelector(".menu-popup");
    const edit = document.querySelector(".edit");
    const del = document.querySelector(".delete");
    refPopup.current.menuPopup = menuPopup;
    refPopup.current.edit = edit;
    refPopup.current.del = del;

    menuPopup.style.display = "none";
    edit.removeAttribute("disabled") 
    edit.addEventListener("click", (e: MouseEvent) => onEdit(e));
    del.addEventListener("click", (e: MouseEvent) => onDel(e));
    document.addEventListener("click", () => {
      menuPopup.style.display = "none";
    });
  }, []);

  //create function that return true if useNavigation is home
  const isHome = () => {
    return useLocation().pathname.includes("/ProtoBook/home");
  };

  /**
   *
   */
  return (
    <motion.div
      id="grid-richtext"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {getNav()}
      <header>
        <Header action={callbackAction} />
      </header>
      <main>{renderListElements()}</main>
      <footer></footer>
      <div className="menu-popup">
        <Button
          waves="light"
          style={{
            marginRight: "5px",
          }}
          className="btn edit"
        >
          Editer
          <Icon left>border_color</Icon>
        </Button>
        <Button
          waves="light"
          style={{
            marginRight: "5px",
          }}
          className="btn delete"
        >
          Supprimer
          <Icon left>delete</Icon>
        </Button>
      </div>
    </motion.div>
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
    setRichTextList: (list: any) => dispatch(setRichTextList(list)),
    setCategoryList: (list: any) => dispatch(setCategoryList(list)),
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
    category: state.category.category,
    richtext: state.richtext.richtext,
  };
};

const RichTexts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRichTexts);

export default RichTexts;
