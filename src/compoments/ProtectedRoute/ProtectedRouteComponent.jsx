import React, { Component } from "react";
import { connect } from "react-redux";
import { enqueueSnackbar } from "../../actions/snackbar";
import { getBit, existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import { Route } from "react-router-dom";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator
} from "../../actions/loginDialog";
import { getCurrentJWT } from "../../services/authService";

class ProtectedRouteComponent extends Component {
  checkIfUserLoggedIn() {
    let { currentUser } = this.props;
    return existsAndIsNotEmpty(currentUser);
  }

  checkUsersPermissons() {
    let { permissionsBit, currentUser } = this.props;
    if (!exists(permissionsBit)) return true;
    return getBit(currentUser.permissions, permissionsBit);
  }

  render() {
    let {
      path,
      component: Component,
      render,
      showLoginDialog,
      enqueueSnackbar
    } = this.props;

    return (
      <Route
        path={path}
        render={props => {
          //Checking if user is logged in and loginDialog
          if (!this.checkIfUserLoggedIn()) {
            //If JWT exists but user does not exist - initial logging in progress so there is no point to show login dialog
            let jwt = getCurrentJWT();

            //Otherwise show login dialog
            if (!existsAndIsNotEmpty(jwt)) showLoginDialog();
            return null;
          }

          //Checking if user is logged in
          if (!this.checkUsersPermissons()) {
            enqueueSnackbar({
              message: "Dostęp zabroniony",
              options: { variant: "error" }
            });
            return null;
          }

          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser
  };
};

export default connect(mapStateToProps, {
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator,
  enqueueSnackbar: enqueueSnackbar
})(ProtectedRouteComponent);
