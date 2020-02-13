import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../utilities/utilities";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import BusyDialogComponent from "./BusyDialog/BusyDialogComponent";
import LoginDialogComponent from "./LoginDialog/LoginDialogComponent";
import EditCurrentUserDialogComponent from "./ChangePasswordDialog/ChangePasswordDialogComponent";
import SnackbarNotifier from "./Snackbar/SnackbarNotifier";
import CurrentUserOverviewComponent from "./CurrentUserOverview/CurrentUserOverviewComponent";
import { Switch } from "react-router-dom";
import ProtectedRouteComponent from "./ProtectedRoute/ProtectedRouteComponent";
import { existsAndIsNotEmpty } from "../utilities/utilities";
import { getCurrentJWT } from "../services/authService";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator
} from "../actions/loginDialog";
import { loginUserWithJWTActionCreatorWrapped } from "../actions/auth";

const styles = theme => ({});

class MainComponent extends Component {
  componentDidMount = async () => {
    let jwt = getCurrentJWT();
    if (existsAndIsNotEmpty(jwt)) this.props.loginUserWithJWT(jwt);
    else this.props.showLoginDialog();
  };

  render() {
    return (
      <React.Fragment>
        <SnackbarNotifier />
        <BusyDialogComponent />
        <LoginDialogComponent />
        <EditCurrentUserDialogComponent />
        <ToolbarComponent />
        <Switch>
          <ProtectedRouteComponent
            path="/me"
            component={CurrentUserOverviewComponent}
          ></ProtectedRouteComponent>
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser
  };
};

const componentWithStyles = withStyles(styles)(MainComponent);

export default connect(mapStateToProps, {
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator,
  loginUserWithJWT: loginUserWithJWTActionCreatorWrapped
})(componentWithStyles);
