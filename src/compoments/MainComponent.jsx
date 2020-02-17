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
import { Switch, Route, Redirect } from "react-router-dom";
import ProtectedRouteComponent from "./ProtectedRoute/ProtectedRouteComponent";
import PrivacyPolicyComponent from "./PrivacyPolicy/PrivacyPolicyComponent";
import { existsAndIsNotEmpty } from "../utilities/utilities";
import { getCurrentJWT } from "../services/authService";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator
} from "../actions/loginDialog";
import { loginUserWithJWTActionCreatorWrapped } from "../actions/auth";
import MainMenuComponent from "./MainMenu/MainMenuComponent";
import EditDataComponent from "./EditDataComponent/EditDataComponent";
import AddUserDialogComponent from "./AddUserDialog/AddUserDialogComponent";
import EditUserDialogComponent from "./EditUserDialog/EditUserDialogComponent";
import RemoveUserDialogComponent from "./RemoveUserDialog/RemoveUserDialogComponent";
import RemoveModelDialogComponent from "./RemoveModelDialog/RemoveModelDialogComponent";
import AddModelDialogComponent from "./AddModelDialog/AddModelDialogComponent";
import EditModelDialogComponent from "./EditModelDialog/EditModelDialogComponent";
import FileNotFoundComponent from "./FileNotFound/FileNotFoundComponent";

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  }
});

class MainComponent extends Component {
  componentDidMount = async () => {
    let jwt = getCurrentJWT();
    if (existsAndIsNotEmpty(jwt)) this.props.loginUserWithJWT(jwt);
    else this.props.showLoginDialog();
  };

  render() {
    let { classes } = this.props;
    return (
      <React.Fragment>
        <SnackbarNotifier />
        <BusyDialogComponent />
        <LoginDialogComponent />
        <EditCurrentUserDialogComponent />
        <AddUserDialogComponent />
        <EditUserDialogComponent />
        <RemoveUserDialogComponent />
        <RemoveModelDialogComponent />
        <EditModelDialogComponent />
        <AddModelDialogComponent />
        <div className={classes.root}>
          <ToolbarComponent />
          <MainMenuComponent />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <ProtectedRouteComponent
                permissionsBit={0}
                path="/sidiroar/me"
                component={CurrentUserOverviewComponent}
              ></ProtectedRouteComponent>
              <ProtectedRouteComponent
                permissionsBit={1}
                path="/sidiroar/users"
                component={EditDataComponent}
              ></ProtectedRouteComponent>
              <Route path="/sidiroar/politykaprywatnosci">
                <PrivacyPolicyComponent />
              </Route>
              <Route path="/sidiroar/notFound">
                <FileNotFoundComponent />
              </Route>
              <Redirect exact path="/sidiroar/" to="/sidiroar/me" />
              <Redirect path="/sidiroar/" to="/sidiroar/notFound" />
            </Switch>
          </main>
        </div>
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
