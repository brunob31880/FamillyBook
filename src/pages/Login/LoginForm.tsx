import React, { useState, useEffect, SyntheticEvent } from "react";
// https://www.gekkode.com/developpement/expression-reguliere-pour-valider-un-mot-de-passe/
import { useNavigate } from "react-router-dom";
import { setUser } from "../../actions/user";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { Button, Icon } from "react-materialize";
import "./LoginForm.css";
/**
 *
 * @returns
 */
const ConnectedLoginForm = (props: any) => {
  const { user } = props;
  const [state, setState] = useState({
    username: "",
    password: "",
    inputErrors: false,
  });
  let navigation = useNavigate();

  useEffect(() => {
    if (user && user.username !== "") {
      console.log("Navigation to home page");
      navigation("/ProtoBook/home");
    }
  }, [user]);

  /**
   *
   * @param event
   */
  const handleChangePassword = (event: SyntheticEvent) => {
    const passwordRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "gm"
    );
    let target = event.target as HTMLInputElement;
    setState({
      ...state,
      inputErrors: !target.value.match(passwordRegex),
      password: target.value,
    });
  };
  /**
   *
   * @param event
   */
  const handleChangeName = (event: SyntheticEvent) => {
    const passwordRegex = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "gm"
    );
    let target = event.target as HTMLInputElement;
    setState({ ...state, username: target.value });
  };
  /**
   *
   * @param event
   */
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let target = event.target as HTMLInputElement;
    props.onSubmit(state.username, state.password);
  };
  /**
   *
   */
  return (
    <motion.form
      className="m-login-form-proto"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="login_title">
        <h3>Login</h3>
      </div>
      <div className="input-field ">
        <i className="material-icons prefix">account_circle</i>
        <input id="Username" type="text" onChange={handleChangeName} />
        <label htmlFor="Username">UserName</label>
      </div>
      <div className="input-field ">
        <i className="material-icons prefix">lock</i>
        <input onChange={handleChangePassword} type="password" id="Password" />
        <label htmlFor="Password">Password</label>
      </div>
      <span className={state.inputErrors == true ? "show-error" : ""}>
        Formé d'un minimum de 8 caractères. Au moins une lettre majuscule. Au
        moins une lettre minuscule. Au moins un chiffre. Au moins un caractère
        spécial
      </span>
      <div className="valid">
        <Button
          className="btn"
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
          onClick={(e) => handleSubmit(e)}
        >
          Login
          <Icon left>lock_open</Icon>
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
  };
};

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLoginForm);

export default LoginForm;
