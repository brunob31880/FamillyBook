import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setBookList } from "../../actions/book";
import { ParseClasse, Logout } from "../../utility/ParseUtils";
import { setCategoryList } from "../../actions/category";
import { isConnected } from "../../utility/UserUtils";
import { useNavigate , useParams} from "react-router-dom";
import { setUser } from "../../actions/user";
import { motion } from "framer-motion";
import { truncateString } from "../../utility/StringUtils";
import { isMobileDevice } from "../../utility/DeviceUtils"
import { Button, Icon } from "react-materialize";
import { SearchBook } from "./SearchBook";
import Parse from "parse/dist/parse.min.js"; //Import parse
import { useLocation } from "react-router-dom";
import { BookList } from "./BookList";
import Header from "../../components/Header/Header";
import { IconPickerItem } from "react-fa-icon-picker";
import { getName, getIcon } from "../../utility/CategoryListUtils";
import './books.css'
// create a stateless component ConnectedBooks with props category user and books
// which return only a div
export const ConnectedBooks = ({
  category,
  user,
  book,
  setBookList,
  setUser,
  onDeleteType,
  setCategoryList,
  dimension,
}: any) => {
  //create a useEffect hook on mount that load the books by using ParseClasse function with parameter "Book"
  //and set the books in the redux store with the function setBooks
  useEffect(() => {
    reLoad();
  }, []);

  const reLoad = () => {
    ParseClasse("Books", (books: any) => {
      setBookList(JSON.parse(JSON.stringify(books)));
    });
    ParseClasse("Category", (rep: any) => {
      setCategoryList(JSON.parse(JSON.stringify(rep)));
    });
  }
  let navigation = useNavigate();
  //create a useEffect hook looking at user and use isConnected function to check if the user is connected
  //if not, redirect to the login page
  useEffect(() => {
    if (!isConnected(user)) {
      navigation("/ProtoBook/");
    }
  }, [user]);

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
  let { id } = useParams();
  /**
   *
   * @param action
   */
  const callbackAction = (action: string) => {
    console.log("action " + action);
    if (action === "leave") {
      Logout(() => console.log("Leaving"), setUser);
    } else if (user && user.username) {
      navigation("/ProtoBook/" + action);
    }
  };
   /**
   *
   */
   const getNav = () => {
    return <div className="mynav">
      <div className="insidenav">
        {renderNavigation()}
      </div>
    </div>;
  };
   /**
   *
   * @returns
   */
   const renderNavigation = () => {
    let tmp = [];

    let obj = category.filter((object: any) => object.name === "Books")[0];
    let catBooks: any = obj ? obj.list : [];

    console.log("catBooks=" + JSON.stringify(catBooks));
    //    {/* <i style={{ marginRight: "5px", lineHeight: "27px", height: "27px" }} className={"fas " + convertCamelCaseStringToHyphenatedString(getIcon(object))} /> */}
    
    catBooks.forEach((object) => {
      tmp.push(
        <Button
        key={getName(object) as string}
        waves="light"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
        className="btn"
        onClick={() => navigation("/ProtoBook/books/" + getName(object))}
      >
       {" "}
       {getIcon(object) &&
          <IconPickerItem icon={getIcon(object)} color="#FFFFFF" size={16} />
        }
        {!isMobileDevice(dimension) && truncateString(getName(object), 8)}
      </Button>
        
        )
    });
    
    tmp.push(
      <a className="btn-floating btn-large waves-effect waves-light lightgreen">
        <i
          className="material-icons"
          onClick={() => navigation("/ProtoBook/create_books_category")}
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
    console.log("Showing category="+category)
    //  console.log("loc=" + useLocation());
    // if location is SearchBook then return SearchBook
   // if (useLocation().pathname.includes("ProtoBook/books/searchbook"))
   //   return <SearchBook />;
   // else
      return (
        isConnected(user) && <BookList
          books={book}
          uid={user.objectId}
          category={category}
          contextMenuListener={contextMenuListener}
        /> 
      );
  };
  //
  const onDoneDelete = () => {
    // navigation("/ProtoBook/" + refPopup.current.type);
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
    onDeleteType(refPopup.current.type, refPopup.current.action, onDoneDelete);
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
    edit.removeAttribute("disabled");
  //  edit.setAttribute("disabled", "true");
    edit.addEventListener("click", (e: MouseEvent) => onEdit(e));
    del.addEventListener("click", (e: MouseEvent) => onDel(e));
    document.addEventListener("click", () => {
      menuPopup.style.display = "none";
    });
  }, []);

  useEffect(() => {
    const mynav = document.querySelector(".mynav");
    const mymain = document.querySelector(".mymain");
    mynav.setAttribute("style", "height:" + (parseInt(dimension.height) - 60) + "px")
    mymain.setAttribute("style", "height:" + (parseInt(dimension.height) - 60) + "px")
  }, [dimension])

  return (
    <motion.div
      id="books"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <header>
        <Header action={callbackAction} />
      </header>
      <div className="mycontainer">
        {getNav()}
        <div className="mymain">{renderListElements()}</div>
      </div>
      <div className="menu-popup">
        <Button
          waves="light"
          style={{
            marginRight: "5px",
          }}
          className="btn edit"
        >
          Editer
          <Icon >border_color</Icon>
        </Button>
        <Button
          waves="light"
          style={{
            marginRight: "5px",
          }}
          className="btn delete"
        >
          Supprimer
          <Icon >delete</Icon>
        </Button>
      </div>
    </motion.div>
  );
};

//create a function mapStateToProps wich return an object with the category, user and books
const mapStateToProps = (state: any) => {
  return {
    category: state.category.category,
    user: state.user.user,
    book: state.book.book,
    dimension: state.dimension.dimension,
  };
};
//create a function mapDispatchToProps wich return an object with functions setUser, setCategory and setBooks
const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
    setCategoryList: (category: any) => dispatch(setCategoryList(category)),
    setBookList: (books: any) => dispatch(setBookList(books)),

  };
};

//connect ConnectedBooks to redux store
export const Books = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedBooks);
//export Books
export default Books;
