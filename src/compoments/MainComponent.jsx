import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../utilities/utilities";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import BusyDialogComponent from "./BusyDialog/BusyDialogComponent";
import LoginDialogComponent from "./LoginDialog/LoginDialogComponent";
import EditCurrentUserDialogComponent from "./ChangePasswordDialog/ChangePasswordDialogComponent";
import ForceUserLoginComponent from "./ForceUserLogin/ForceUserLoginComponent";
import SnackbarNotifier from "./Snackbar/SnackbarNotifier";

const styles = theme => ({});

class MainComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <SnackbarNotifier />
        <BusyDialogComponent />
        <LoginDialogComponent />
        <EditCurrentUserDialogComponent />
        <ForceUserLoginComponent />
        <ToolbarComponent />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const componentWithStyles = withStyles(styles)(MainComponent);

export default connect(mapStateToProps, {})(componentWithStyles);
