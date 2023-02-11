import LoginForm from "./pages/Login/LoginForm";
import CreateBookCategory from "./pages/CreateBookCategory/CreateBookCategory";
import CreateBook from "./pages/CreateBook/CreateBook";
import CreateAudio from "./pages/CreateAudio/CreateAudio";
import CreateLink from "./pages/CreateLink/CreateLink";
import CreateRichText from "./pages/CreateRichText/CreateRichText";
import CreateLinkCategory from "./pages/CreateLinkCategory/CreateLinkCategory";
import CreateRichTextCategory from "./pages/CreateRichTextCategory/CreateRichTextCategory";
import Home from "./pages/Home/Home";
import Links from "./pages/LinkList/Links";
import Books from "./pages/BookList/Books";
import Audios from "./pages/AudioList/Audio";
import RichTexts from "./pages/RichTextList/RichText";
import { NoMatch } from "./pages/NoMatch";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { startTimer } from "./actions/clock";
import { setUser } from "./actions/user";
import { useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { initialValue } from "./datas/richTextCst";
import WrapperCreateRichText from "./pages/CreateRichText/WrapperCreateRichText";
import WrapperCreateLink from "./pages/CreateLink/WrapperCreateLink";
import WrapperCreateBook from "./pages/CreateBook/WrapperCreateBook";
import { isConnected } from "./utility/UserUtils";
import { b4config } from "./datas/b4appconfig";
import { ParseClasse } from "./utility/ParseUtils";
import { setThemeList } from "./actions/theme";
import { setDocumentDimension } from "./actions/dimension";
import { useRef } from "react";

import {
  GetConnection,
  CreateClasse,
  ModifyElementInClasseWithId,
  deleteElementInClassWithId,
} from "./utility/ParseUtils";
import "./App.css";

/**
 *
 * @param props
 * @returns
 */
const ConnectedApp = (props: any) => {
  const { user, category, theme } = props;
  const bgCompteur = useRef(1);
  useEffect(() => {
    // Initialisation connection Parse
    Parse.serverURL = b4config.server;
    // Initialisation
    Parse.initialize(b4config.appId, b4config.jsKey);
  }, []);

  useEffect(() => {
    if (user) console.log("Connected ? " + isConnected(user));
  }, [user]);

  useEffect(() => {
    ParseClasse("Theme", (theme: any) => {
      console.log("Theme list");
      props.setThemeList(JSON.parse(JSON.stringify(theme)));
    });
    //create a repetitive timer to change background image
    /*
    const interval = setInterval(() => {
      bgCompteur.current = bgCompteur.current + 1;
      if (bgCompteur.current > 4) bgCompteur.current = 1;
      console.log(bgCompteur.current);
      document.querySelector("body").style.backgroundImage =
        "url('./assets/library-" + bgCompteur.current + ".png')";
    }, 5000);
    */
  }, []);

  useEffect(() => {
    if (user && theme && theme[bgCompteur.current]) {
      //create a repetitive timer to change background image
      // console.log("Theme ", theme[bgCompteur.current]);
      const interval = setInterval(() => {
        //  console.log("Theme ", theme[bgCompteur.current]);
        bgCompteur.current = bgCompteur.current + 1;
        if (bgCompteur.current > 4) bgCompteur.current = 1;
        let url = theme[bgCompteur.current].background.url;
        document.querySelector("body").style.backgroundImage =
          "url('" + url + "')";
      }, 15000);
    }
  }, [theme, user]);

  //create a useEffect that get the document width and height and set it in the redux store
  useEffect(() => {
    const handleResize = () => {
      props.setDocumentDimension({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("touchmove", handleTouchMove);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   *
   * @param username
   * @param password
   */
  const handlerSubmit = (username: string, password: string) => {
    GetConnection(username, password, (user: any) => props.setUser(user));
  };
  /**
   *
   * @param name
   * @param descriptif
   * @param url
   * @param file
   * @param categorie
   * @param onDone
   */
  const handlerCreateProto = (
    name: string,
    descriptif: string,
    url: string,
    file: any,
    categorie: any,
    onDone: any
  ) => {
    let parsefile;
    if (file !== null) {
      console.log("Building parse file with " + JSON.stringify(file));
      parsefile = new Parse.File(file.name, file);
    }

    CreateClasse(
      "Links",
      {
        name: name,
        descriptif: descriptif,
        url: url,
        vignette: parsefile,
        userId: user.objectId,
        category: categorie,
      },
      (c: any) => onDone(c),
      (err: any) => console.log(err)
    );
  };

  /**
   *
   * @param content
   * @param onDone
   */
  const handlerCreateRichText = (
    titre: string,
    categorySelected: string,
    content: any,
    //b64,
    onDone: any
  ) => {
    /*
    let parsefile;
    if (b64 !== null) {
      console.log("Building parse file with " + JSON.stringify(b64));
      let now = new Date();
      let fileName = "picture_" + now.toDateString() + ".png";
      parsefile = new Parse.File(fileName, { base64: b64 });
    }
    */
    //  parsefile.save().then(
    //    function () {
    //      console.log("ParseFile created");
    CreateClasse(
      "RichText",
      {
        name: titre,
        category: categorySelected,
        content: content,
        //vignette: parsefile,
        userId: user.objectId,
      },
      (c: any) => onDone(c),
      (err: any) => console.log(err)
    );
    //  },
    //  function (error) {}
    //);
    // }
  };

  /**
   *
   * @param name
   * @param onDone
   */
  const handlerCreateRichTextCategory = (name: any, icon: any, onDone) => {
    let obj = category.filter((object: any) => object.name === "RichText")[0];
    let cpObj = JSON.parse(JSON.stringify(obj));
    let tmp = [].concat(obj.list);
    let object = {
      name: name,
      icon: icon,
    };
    tmp.push(object);
    cpObj.list = tmp;

    ModifyElementInClasseWithId(
      "Category",
      obj.objectId,
      cpObj,
      (c: any) => onDone(c),
      (e: String) => console.log("error  " + e),
      (e: String) => console.log("error " + e)
    );
  };
  /**
   * 
   * @param subject 
   * @param onDone 
   */
  const handlerCreateBookCategory = (subjects: string, icon: any, onDone) => {
    let obj = category.filter((object: any) => object.name === "Books")[0];
    let cpObj = JSON.parse(JSON.stringify(obj));
    let tmp = [].concat(obj.list);
    let object = {
      name: subjects.split("--")[0],
      icon: icon,
    };
    tmp.push(object);
    cpObj.list = tmp;

    ModifyElementInClasseWithId(
      "Category",
      obj.objectId,
      cpObj,
      (c: any) => onDone(c),
      (e: String) => console.log("error  " + e),
      (e: String) => console.log("error " + e)
    );
  }
  /**
   *
   * @param name
   * @param onDone
   */
  const handlerLinkTextCategory = (name: any, icon: any, onDone) => {
    let obj = category.filter((object: any) => object.name === "Links")[0];
    let cpObj = JSON.parse(JSON.stringify(obj));
    let tmp = [].concat(obj.list);
    let object = {
      name: name,
      icon: icon,
    };
    tmp.push(object);
    cpObj.list = tmp;

    ModifyElementInClasseWithId(
      "Category",
      obj.objectId,
      cpObj,
      (c: any) => onDone(c),
      (e: String) => console.log("error  " + e),
      (e: String) => console.log("error " + e)
    );
  };

  /**
   *
   * @param id
   * @param name
   * @param descriptif
   * @param url
   * @param file
   * @param categorie
   * @param onDone
   */
  const handlerModroto = (
    id: string,
    name: string,
    descriptif: string,
    url: string,
    file: any,
    categorie: any,
    onDone: any
  ) => {
    let parsefile;
    if (file !== null) {
      //  console.log("Building parse file with " + JSON.stringify(file));
      //  parsefile = new Parse.File(file.name, file);
    }
    let cpObj = {
      name: name,
      descriptif: descriptif,
      url: url,
      // vignette: parsefile,
      userId: user.objectId,
      category: categorie,
    };

    ModifyElementInClasseWithId(
      "Links",
      id,
      cpObj,
      (c: any) => onDone(c),
      (e: String) => console.log("error  " + e),
      (e: String) => console.log("error " + e)
    );
  };



  /**
   *
   * @param id
   * @param titre
   * @param content
   * @param b64
   * @param onDone
   */
  const handlerModRichText = (
    id: string,
    titre: string,
    categorySelected: string,
    content: any,
    // b64,
    onDone: any
  ) => {
    console.log("Selected category ", categorySelected);
    /*
    let parsefile;
    if (b64 !== null) {
      console.log("Building parse file with " + JSON.stringify(b64));
      let now = new Date();
      let fileName = "picture_" + now.toDateString() + ".png";
      parsefile = new Parse.File(fileName, { base64: b64 });
    }
    */
    // parsefile.save().then(
    //   function () {
    //      console.log("ParseFile created");
    console.log("Titre =" + titre);
    ModifyElementInClasseWithId(
      "RichText",
      id,
      {
        name: titre,
        category: categorySelected,
        content: content,
        // vignette: parsefile,
        userId: user.objectId,
      },
      (c: any) => onDone(c),
      (err: any) => console.log(err),
      (e: String) => console.log("error " + e)
    );
    //    },
    //    function (error) {}
    //  );
    //}
  };
  /**
   *
   * @param type
   * @param id
   */
  const handleDeleteType = (type: String, id: String, onDoneDelete) => {
    let nClass = "";
    switch (type) {
      case "link":
        nClass = "Links";
        break;
      case "richtext":
        nClass = "RichText";
        break;
      case "books":
        nClass = "Books";
        break;
      default:
        nClass = "Links";
    }
    console.log("Delete " + id + " classe " + nClass)
    deleteElementInClassWithId(
      nClass,
      id,
      (e: any) => {
        console.log("Delete " + id);
        onDoneDelete();
      },
      (e: any) => console.log("error " + e)
    );
  };
  /**
   * 
   * @param link 
   * @param name 
   */
  const handlerCreateAudio = (link: string, title: string, onDone: any) => {
    console.log("Create Audio with link=" + link);
    CreateClasse(
      "Audios",
      {
        title: title,
        link: link,
      },
      (c: any) => onDone(c),
      (err: any) => console.log(err)
    );
  }
  /**
   * 
   * @param isbn 
   * @param title 
   * @param authors 
   * @param pageCount 
   * @param thumbnail 
   * @param subjects 
   * @param onDone 
   */
  const handlerCreateBook = (
    isbn: string,
    title: string,
    authors: Array<string>,
    pageCount: string,
    thumbnail: string,
    subjects: Array<string>,
    category: string,
    onDone: any
  ) => {
    console.log("Create Book");
    //  props.onCreateBook(state.isbn, title,authors,pageCount,thumbnail,onDone);
    CreateClasse(
      "Books",
      {
        title: title,
        isbn: isbn,
        authors: authors,
        pageCount: pageCount,
        thumbnail: thumbnail,
        subjects: subjects,
        userId: user.objectId,
        category: category
      },
      (c: any) => onDone(c),
      (err: any) => console.log(err)
    );
  };

  /**
   * 
   * @param id 
   * @param isbn 
   * @param title 
   * @param authors 
   * @param pageCount 
   * @param thumbnail 
   * @param subjects 
   * @param category 
   * @param onDone 
   */
  const handlerModBook = (
    id:string,
    isbn: string,
    title: string,
    authors: Array<string>,
    pageCount: string,
    thumbnail: string,
    subjects: Array<string>,
    category: string,
    onDone: any
  ) => {
   
    let cpObj = {
      title: title,
      isbn: isbn,
      authors: authors,
      pageCount: pageCount,
      thumbnail: thumbnail,
      subjects: subjects,
      userId: user.objectId,
      category: category
    };
    console.log("Mod ",cpObj)
    ModifyElementInClasseWithId(
      "Books",
      id,
      cpObj,
      (c: any) => onDone(c),
      (e: String) => console.log("error  " + e),
      (e: String) => console.log("error " + e)
    );
  };

  /**
   *
   */
  return (
    <Routes>
      <Route path="/" element={<LoginForm onSubmit={handlerSubmit} />} />
      <Route
        path="/ProtoBook"
        element={<LoginForm onSubmit={handlerSubmit} />}
      />
      {/*  <Route path="/ProtoBook/books/searchbook" element={<Books />} /> */}
      <Route
        path="/ProtoBook/create_book"
        element={<CreateBook onCreateBook={handlerCreateBook} />}
      />
      <Route
        path="/ProtoBook/create_books/edit/:id"
        element={<WrapperCreateBook onModBook={handlerModBook} />}
      />
      <Route
        path="/ProtoBook/create_audio"
        element={<CreateAudio onCreateVideo={handlerCreateAudio} />}
      />
      <Route
        path="/ProtoBook/home"
        element={<Home onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/links"
        element={<Links onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/links/:category"
        element={<Links onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/create_link"
        element={<CreateLink onCreateProto={handlerCreateProto} />}
      />
      <Route
        path="/ProtoBook/create_link/edit/:id"
        element={<WrapperCreateLink onModProto={handlerModroto} />}
      />
      <Route
        path="/ProtoBook/books"
        element={<Books onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/books/:category"
        element={<Books onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/audios"
        element={<Audios onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/richtext"
        element={<RichTexts onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/richtext/:category"
        element={<RichTexts onDeleteType={handleDeleteType} />}
      />
      <Route
        path="/ProtoBook/create_richtext_category"
        element={
          <CreateRichTextCategory
            onCreateRichTextCategory={handlerCreateRichTextCategory}
          />
        }
      />
      <Route
        path="/ProtoBook/create_links_category"
        element={
          <CreateLinkCategory onCreateLinkCategory={handlerLinkTextCategory} />
        }
      />
      <Route
        path="/ProtoBook/create_books_category"
        element={
          <CreateBookCategory onCreateBookCategory={handlerCreateBookCategory} />
        }
      />
      <Route
        path="/ProtoBook/create_richtext"
        element={
          <CreateRichText
            onCreateRichText={handlerCreateRichText}
            value={initialValue}
          />
        }
      />
      <Route
        path="/ProtoBook/create_richtext/edit/:id"
        element={<WrapperCreateRichText onModRichText={handlerModRichText} />}
      />

      <Route path="/ProtoBook/*" element={<NoMatch />} />

    </Routes>
  );
};
/**
 *
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch: any) => {
  return {
    startTimer: () => dispatch(startTimer()),
    setUser: (user: any) => dispatch(setUser(user)),
    setThemeList: (themeList: any) => dispatch(setThemeList(themeList)),
    setDocumentDimension: (dimension: any) => dispatch(setDocumentDimension(dimension)),

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
    theme: state.theme.theme,
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
