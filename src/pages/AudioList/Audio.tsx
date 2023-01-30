import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setAudioList } from "../../actions/audio";
import { ParseClasse, Logout } from "../../utility/ParseUtils";
import { setCategoryList } from "../../actions/category";
import { isConnected } from "../../utility/UserUtils";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { motion } from "framer-motion";
import { Button, Icon } from "react-materialize";
import { useLocation } from "react-router-dom";
import { AudioList } from "./AudioList";
import Header from "../../components/Header/Header";

export const ConnectedAudios = ({
    category,
    user,
    audio,
    setVideoList,
    setUser,
    onDeleteType,
    setCategoryList,
}: any) => {
    //create a useEffect hook on mount that load the bideos by using ParseClasse function with parameter "Video"
    //and set the videos in the redux store with the function setBooks
    useEffect(() => {
        ParseClasse("Audios", (audios: any) => {
            setVideoList(JSON.parse(JSON.stringify(audios)));
        });
        ParseClasse("Category", (rep: any) => {
            setCategoryList(JSON.parse(JSON.stringify(rep)));
        });
    }, []);

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
        return <nav>{renderNavigation()}</nav>;
    };
    /**
     *
     * @returns
     */
    const renderNavigation = () => {
        let tmp = [];

        let obj = category.filter((object: any) => object.name === "Videos")[0];
        let catLinks: Array<String> = obj ? obj.list : [];
        console.log("CatLinks=" + JSON.stringify(catLinks));
        catLinks.forEach((object) => {
            tmp.push(
                <Button
                    key={object as string}
                    waves="light"
                    className="btn"
                    onClick={() => navigation("/ProtoBook/videos/" + object)}
                >
                    {" "}
                    {object}{" "}
                </Button>
            );
        });
        tmp.push(
            <a className="btn-floating btn-large waves-effect waves-light lightgreen">
                <i
                    className="material-icons"
                    onClick={() => navigation("/ProtoBook/create_audios_category")}
                >
                    add
                </i>
            </a>
        );
        return tmp;
    };
    //
    const renderListElements = () => {
        console.log("loc=" + useLocation());
        // if location is SearchBook then return SearchBook  
        return (
            <AudioList
                audios={audio}
                uid={user.objectId}
                category={category}
                contextMenuListener={contextMenuListener}
            />
        );
    };
    //
    const onDoneDelete = () => {
        navigation("/ProtoBook/" + refPopup.current.type);
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

        edit.addEventListener("click", (e: MouseEvent) => onEdit(e));
        del.addEventListener("click", (e: MouseEvent) => onDel(e));
        document.addEventListener("click", () => {
            menuPopup.style.display = "none";
        });
    }, []);

    return (
        <motion.div
            id="grid"
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

//create a function mapStateToProps wich return an object with the category, user and books
const mapStateToProps = (state: any) => {
    return {
        category: state.category.category,
        user: state.user.user,
        audio: state.audio.audio,
    };
};
//create a function mapDispatchToProps wich return an object with functions setUser, setCategory and setVideoList
const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: any) => dispatch(setUser(user)),
        setCategoryList: (category: any) => dispatch(setCategoryList(category)),
        setAudioList: (audios: any) => dispatch(setAudioList(audios)),

    };
};

//connect ConnectedVideos to redux store
export const Audios = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedAudios);
//export Books
export default Audios;