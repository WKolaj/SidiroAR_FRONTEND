import React, { Component } from "react";
import { loginUserWithJWTActionCreator } from "../actions/auth";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { existsAndIsNotEmpty } from "../utilities/utilities";
import { getCurrentJWT } from "../services/authService";
import CurrentUserComponent from "./CurrentUserComponent";

const styles = theme => ({});

class MainComponent extends Component {
  componentDidMount = async () => {
    let jwt = getCurrentJWT();
    if (existsAndIsNotEmpty(jwt)) this.props.loginUserWithJWT(jwt);
  };

  render() {
    return <CurrentUserComponent />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser
  };
};

const componentWithStyles = withStyles(styles)(MainComponent);

export default connect(mapStateToProps, {
  loginUserWithJWT: loginUserWithJWTActionCreator
})(componentWithStyles);
