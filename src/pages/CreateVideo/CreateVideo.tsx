import React, { useState, useEffect, SyntheticEvent } from "react";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Icon, TextInput } from "react-materialize";
import { isConnected } from "../../utility/UserUtils";
import "./createvideo.css";
import Parse from "parse/dist/parse.min.js"; //Import parse
import rapid_API_KEY from "../../datas/b4appconfig"
//import axios from 'axios'
import { useNavigate } from "react-router-dom";
/**
 *
 * @returns
 */
const ConnectedCreateVideo = (props: any) => {
    const { user, link, category, value, dimension } = props;
    const [saving, setSaving] = useState(false);
    const [urlResult, setUrlResult] = useState(null);
    let { id } = useParams();

    const [state, setState] = useState({
        url: "",
        result: null,
    });

    useEffect(() => {
        console.log("Update value");
        if (!value) return;
        setState({
            ...state,
            url: value.name ? value.name : "",
        });
    }, [value]);
    /**
     *
     * @param event
     */
    const handleChangeURL = (event: SyntheticEvent) => {
        let target = event.target as HTMLInputElement;
        setState({
            ...state,
            url: target.value,
        });
    };

    //create a useEffect hook looking at user and use isConnected function to check if the user is connected
    //if not, redirect to the login page
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
            navigation("/ProtoBook/videos");
        }
    };
    /**
     *
     * @param e
     */
    const handleCancel = (e: SyntheticEvent) => {
        navigation("/ProtoBook/videos");
    };


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        let target = event.target as HTMLInputElement;
        console.log("YT_NUMBER=", state.url.split("=")[1])

        Parse.Cloud.run("fetch_youtube", { yt_number: state.url.split("=")[1] }).then(function (result) {
            console.log("resultat ", result);
            setUrlResult(result)
        });

    }

    const handleSave = () => {
        const {link,title,duration}=urlResult;
        props.onCreateVideo(link,title,duration,onDone)
      }
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
     */
    return (
        <motion.form
            className="m-login-form"
            //onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="link_title">
                <h3>Video</h3>
            </div>
            <div className="input-field ">
                <i className="material-icons prefix">videocam</i>
                <input
                    id="Name"
                    type="text"
                    onChange={handleChangeURL}
                    placeholder="Paste a Youtube video URL link..."
                    value={state.url}
                />
                <label htmlFor="URL">URL</label>
            </div>

            {getVignette()}

            <div className="link_controls" style={{ marginTop: "10px" }}>
                {!urlResult && <Button
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
                </Button>}

                <Button
                    className="btn"
                    node="button"
                    style={{
                        marginRight: "5px",
                    }}
                    waves="light"
                    onClick={(e) => handleSubmit(e)}
                >
                    Convert
                </Button>
                {urlResult && 
                    <Button
                    className="btn"
                    node="button"
                    style={{
                        marginRight: "5px",
                    }}
                    waves="light"
                    onClick={(e) => handleSave()}
                >
                    Save
                    <Icon left>save</Icon>
                </Button>
                }
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

const CreateVideo = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCreateVideo);

export default CreateVideo;
