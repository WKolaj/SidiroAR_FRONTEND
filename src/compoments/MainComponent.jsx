import React, { Component } from "react";
import { loginUserWithJWTActionCreator } from "../actions/auth";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { existsAndIsNotEmpty, snooze } from "../utilities/utilities";
import { getCurrentJWT } from "../services/authService";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import BusyDialogComponent from "./BusyDialog/BusyDialogComponent";
import {
  closeSnackbar,
  enqueueSnackbar,
  removeSnackbar
} from "../actions/snackbar";
import SnackbarNotifier from "./Snackbar/SnackbarNotifier";

const styles = theme => ({});

class MainComponent extends Component {
  componentDidMount = async () => {
    let jwt = getCurrentJWT();
    if (existsAndIsNotEmpty(jwt)) this.props.loginUserWithJWT(jwt);

    this.props.enqueueSnackbar({
      message: "Jakiś tam błąd",
      options: { variant: "error" }
    });
  };

  render() {
    return (
      <React.Fragment>
        <SnackbarNotifier />
        <BusyDialogComponent />
        <ToolbarComponent />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const componentWithStyles = withStyles(styles)(MainComponent);

export default connect(mapStateToProps, {
  loginUserWithJWT: loginUserWithJWTActionCreator,
  enqueueSnackbar: enqueueSnackbar
})(componentWithStyles);
