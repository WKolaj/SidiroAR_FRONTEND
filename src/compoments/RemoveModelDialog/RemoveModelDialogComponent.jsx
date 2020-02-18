import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@material-ui/core";
import {
  showRemoveModelDialogActionCreator,
  hideRemoveModelDialogActionCreator
} from "../../actions/removeModelDialog";
import { deleteModelDataActionCreatorWrapped } from "../../actions/data";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin } from "../../utilities/userMethods";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

const styles = theme => {
  return {
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
    textField: {},
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block"
    },
    errorLabel: {
      color: red.A400,
      display: "block"
    },
    selectField: {},
    selectFieldDiv: {
      "margin-bottom": theme.spacing(1),
      display: "block"
    }
  };
};

class RemoveModelDialogComponent extends Component {
  handleDeleteClicked = async e => {
    let {
      hideRemoveModelDialog,
      removeModelDialog,
      deleteModelData
    } = this.props;

    await deleteModelData(removeModelDialog.userId, removeModelDialog.modelId);
    await hideRemoveModelDialog();
  };

  handleCancelClicked = async () => {
    let { hideRemoveModelDialog } = this.props;
    await hideRemoveModelDialog();
  };

  checkUsersPermissions = loggedUser => {
    if (!existsAndIsNotEmpty(loggedUser)) return false;
    if (!exists(loggedUser.permissions)) return false;

    //If user is not and admin - cannot delete any user
    if (!isAdmin(loggedUser.permissions)) return false;

    //Otherwise return true - everything is ok.
    return true;
  };

  render() {
    let {
      currentUser,
      removeModelDialog,
      classes,
      hideRemoveModelDialog,
      modelToRemove
    } = this.props;

    //Not showing element until userToRemove is not available
    if (!existsAndIsNotEmpty(modelToRemove)) return null;

    let usersPermissionsValid = this.checkUsersPermissions(currentUser);

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (removeModelDialog.visible) hideRemoveModelDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={removeModelDialog.visible}
          className={classes.dialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              width: "fit-content",
              height: "fit-content",
              minWidth: 500,
              background: blueGrey[900]
            }
          }}
        >
          <DialogTitle className={classes.dialogTitle}>
            Usuwanie modelu
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Typography>
              Czy na pewno chcesz usunąć model <b>{modelToRemove.name}</b>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCancelClicked}
              color="primary"
              variant="contained"
              style={{ minWidth: 125 }}
            >
              Nie
            </Button>
            <Button
              onClick={this.handleDeleteClicked}
              color="secondary"
              variant="contained"
              style={{ minWidth: 125 }}
            >
              Tak
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let modelToRemove = {};

  //Finding model to be removed
  if (
    existsAndIsNotEmpty(state.removeModelDialog.userId) &&
    existsAndIsNotEmpty(state.removeModelDialog.modelId)
  ) {
    modelToRemove =
      state.data.usersData[state.removeModelDialog.userId].models[
        state.removeModelDialog.modelId
      ];
  }

  return {
    currentUser: state.auth.currentUser,
    modelToRemove: modelToRemove,
    removeModelDialog: state.removeModelDialog,
    data: state.data.usersData
  };
};

const componentWithStyles = withStyles(styles)(RemoveModelDialogComponent);

export default connect(mapStateToProps, {
  showRemoveModelDialog: showRemoveModelDialogActionCreator,
  hideRemoveModelDialog: hideRemoveModelDialogActionCreator,
  deleteModelData: deleteModelDataActionCreatorWrapped
})(componentWithStyles);
