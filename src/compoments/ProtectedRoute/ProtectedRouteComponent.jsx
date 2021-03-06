import React, { Component } from "react";
import { connect } from "react-redux";
import { enqueueSnackbar } from "../../actions/snackbar";
import { getBit, existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import { Route } from "react-router-dom";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator,
} from "../../actions/loginDialog";
import { getCurrentJWT } from "../../services/authService";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  accessForbiddenTypography: {
    margin: theme.spacing(3),
  },
});

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

  renderAccessForbiddenComponent = () => {
    let { t } = this.props;
    return (
      <Typography
        className={this.props.classes.accessForbiddenTypography}
        variant="h4"
      >
        {t("accessForbiddenContent.mainText")}
      </Typography>
    );
  };

  render() {
    let {
      path,
      component: Component,
      render,
      showLoginDialog,
      enqueueSnackbar,
      t,
    } = this.props;

    return (
      <Route
        path={path}
        render={(props) => {
          //Checking if user is logged in and loginDialog
          if (!this.checkIfUserLoggedIn()) {
            //If JWT exists but user does not exist - initial logging in progress so there is no point to show login dialog
            let jwt = getCurrentJWT();

            //Otherwise show login dialog
            if (!existsAndIsNotEmpty(jwt)) showLoginDialog();
            return this.renderAccessForbiddenComponent();
          }

          //Checking if user is logged in
          if (!this.checkUsersPermissons()) {
            enqueueSnackbar({
              message: t("accessForbiddenContent.errorMessage"),
              options: { variant: "error" },
            });
            return this.renderAccessForbiddenComponent();
          }

          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const componentWithStyles = withStyles(styles)(ProtectedRouteComponent);

const componentWithTranslation = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator,
  enqueueSnackbar: enqueueSnackbar,
})(componentWithTranslation);
