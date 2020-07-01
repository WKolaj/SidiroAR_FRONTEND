import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import {
  showRemoveUserDialogActionCreator,
  hideRemoveUserDialogActionCreator,
} from "../../actions/removeUserDialog";
import { deleteUserDataActionCreatorWrapped } from "../../actions/data";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin, isSuperAdmin } from "../../utilities/userMethods";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import { withTranslation } from "react-i18next";

const styles = (theme) => {
  return {
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
    textField: {},
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block",
    },
    errorLabel: {
      color: red[900],
      display: "block",
    },
    selectField: {},
    selectFieldDiv: {
      "margin-bottom": theme.spacing(1),
      display: "block",
    },
  };
};

class RemoveUserDialogComponent extends Component {
  handleDeleteClicked = async (e) => {
    let { hideRemoveUserDialog, removeUserDialog, deleteUser } = this.props;

    await deleteUser(removeUserDialog.userId);
    await hideRemoveUserDialog();
  };

  handleCancelClicked = async () => {
    let { hideRemoveUserDialog } = this.props;
    await hideRemoveUserDialog();
  };

  checkUsersPermissions = (loggedUser, userToRemove) => {
    if (!existsAndIsNotEmpty(loggedUser)) return false;
    if (!exists(loggedUser.permissions)) return false;

    //If user is not and admin - cannot delete any user
    if (!isAdmin(loggedUser.permissions)) return false;

    //If logged user is not a super admin, but user to delete is an admin - return false
    if (
      !isSuperAdmin(loggedUser.permissions) &&
      isAdmin(userToRemove.permissions)
    )
      return false;

    //If logged user is not a super admin, but user to delete is a super admin - return false
    if (
      !isSuperAdmin(loggedUser.permissions) &&
      isSuperAdmin(userToRemove.permissions)
    )
      return false;

    //Otherwise return true - everything is ok.
    return true;
  };

  render() {
    let {
      currentUser,
      removeUserDialog,
      classes,
      hideRemoveUserDialog,
      userToRemove,
      t,
    } = this.props;

    //Not showing element until userToRemove is not available
    if (!existsAndIsNotEmpty(userToRemove)) return null;

    let usersPermissionsValid = this.checkUsersPermissions(
      currentUser,
      userToRemove
    );

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (removeUserDialog.visible) hideRemoveUserDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={removeUserDialog.visible}
          className={classes.dialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              width: "fit-content",
              height: "fit-content",
              minWidth: 500,
              background: blueGrey[900],
            },
          }}
        >
          <DialogTitle className={classes.dialogTitle}>
            {t("removeUserDialog.dialogTitle")}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Typography>
              {`${t("removeUserDialog.dialogContentText")} `}
              <b>{userToRemove.email}</b>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDeleteClicked}
              color="secondary"
              variant="contained"
              style={{ minWidth: 125 }}
            >
              {t("removeUserDialog.yesButtonText")}
            </Button>
            <Button
              onClick={this.handleCancelClicked}
              color="primary"
              variant="contained"
              style={{ minWidth: 125 }}
            >
              {t("removeUserDialog.noButtonText")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let userToRemove = {};

  //Finding uset to be removed
  if (existsAndIsNotEmpty(state.removeUserDialog.userId)) {
    userToRemove = state.data.usersData[state.removeUserDialog.userId];
  }

  return {
    currentUser: state.auth.currentUser,
    userToRemove: userToRemove,
    removeUserDialog: state.removeUserDialog,
    data: state.data.usersData,
  };
};

const componentWithStyles = withStyles(styles)(RemoveUserDialogComponent);

const componentWithTrans = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showRemoveUserDialog: showRemoveUserDialogActionCreator,
  hideRemoveUserDialog: hideRemoveUserDialogActionCreator,
  deleteUser: deleteUserDataActionCreatorWrapped,
})(componentWithTrans);
