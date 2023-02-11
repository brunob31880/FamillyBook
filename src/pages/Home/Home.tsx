import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { setUser } from "../../actions/user";
import { setLinkList } from "../../actions/link";
import { setCategoryList } from "../../actions/category";
import { setRichTextList } from "../../actions/richtext";
import { setBookList } from "../../actions/book";
import { connect } from "react-redux";
import { ParseClasse, Logout } from "../../utility/ParseUtils";
import { isMobileDevice } from "../../utility/DeviceUtils";
import Header from "../../components/Header/Header";
import Carousel from "react-grid-carousel";

import "./home.css";
/**
 *
 * @returns
 */
const ConnectedHome = (props: any) => {
  const { category, user, link, dimension, book } = props;
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
    ParseClasse("Links", (rep: any) => {
      props.setLinkList(JSON.parse(JSON.stringify(rep)));
    });
    ParseClasse("RichText", (rep: any) => {
      props.setRichTextList(JSON.parse(JSON.stringify(rep)));
    });
    ParseClasse("Books", (rep: any) => {
      props.setBookList(JSON.parse(JSON.stringify(rep)));
    });
    ParseClasse("Category", (rep: any) => {
      props.setCategoryList(JSON.parse(JSON.stringify(rep)));
    });

  }, []);

  useEffect(() => {
    console.log("Modification user :" + JSON.stringify(user));
    if (!user || user.username === "") {
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

  //
  const renderListLinkElements = () => {
    return link.map((object: any) => (
      <Carousel.Item>
        <div className="center">
          <img width="100%" height="100px" src={object.vignette.url} />
        </div>
      </Carousel.Item>
    ));
  };
  const renderListBookElements = () => {
    return book.map((object: any) => (
      <Carousel.Item>
        <div className="center">
          <img width="100%" height="140px" src={object.thumbnail} />
        </div>
      </Carousel.Item>
    ));
  };


  useEffect(() => {
  //  console.log("ICI " + (parseInt(dimension.height) - 60) + "px")
    const myarticle = document.querySelector(".myarticle");
    myarticle.setAttribute("style", "height:" + (parseInt(dimension.height) - 60) + "px")
  }, [dimension])

  /**
   *
   */
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <header>
        <Header action={callbackAction} />
      </header>
      <div className="center">
        <div className="myarticle">
          <h1 style={{ color: "white" }}>Links: {link.length}</h1>
          {!isMobileDevice(dimension) &&
            <Carousel
              cols={6}
              rows={1}
              gap={1}
              containerStyle={{ background: "transparent" }}
            >

              {renderListLinkElements()}
            </Carousel>
          }
          <h1 style={{ color: "white" }}>Books: {book.length}</h1>
          {!isMobileDevice(dimension) &&
            <Carousel
              cols={6}
              rows={1}
              gap={1}
              containerStyle={{ background: "transparent" }}
            >

              {renderListBookElements()}
            </Carousel>
          }
          {<p style={{ color: "white" }}> {dimension.height} </p>}
        </div>
      </div>
      <footer></footer>
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
    setLinkList: (list: any) => dispatch(setLinkList(list)),
    setRichTextList: (list: any) => dispatch(setRichTextList(list)),
    setCategoryList: (list: any) => dispatch(setCategoryList(list)),
    setBookList: (books: any) => dispatch(setBookList(books)),
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
    book: state.book.book,
    category: state.category.category,
    richtext: state.richtext.richtext,
    dimension: state.dimension.dimension
  };
};

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
