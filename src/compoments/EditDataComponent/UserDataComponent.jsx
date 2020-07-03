import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  changeFilterActionCreator,
  selectUserActionCreator,
  resetActionCreator,
  doesUsersEmailFitsFilter,
} from "../../actions/editDataComponent";
import {
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { Edit, Delete, Add, PersonAdd } from "@material-ui/icons";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { showAddUserDialogActionCreator } from "../../actions/addUserDialog";
import { showEditUserDialogActionCreator } from "../../actions/editUserDialog";
import { showRemoveUserDialogActionCreator } from "../../actions/removeUserDialog";
import { showAddModelDialogActionCreator } from "../../actions/addModelDialog";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin, isSuperAdmin } from "../../utilities/userMethods";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  userGrid: {
    padding: 10,
  },
  selectUserGrid: {
    "padding-right": 10,
    "padding-top": 10,
  },
  addModelButton: { "margin-top": 20, "margin-right": 20 },
  filterUserGrid: {
    "padding-right": 10,
    "padding-top": 10,
  },
  selectUserInputLabel: {},
  selectUserInput: {},
  filterInputLabel: {},
  filterInputTextField: {},
  userButtonGrid: {},
  userButtonGridItem: {},
  userButton: {
    "margin-top": 20,
    "margin-right": 20,
    width: 125,
  },
});

class UserDataComponent extends Component {
  handleUserSelectionChange = async (event) => {
    let { selectUser } = this.props;

    await selectUser(event.target.value);
  };

  handleFilterTextChange = async (event) => {
    let { changeFilter } = this.props;

    await changeFilter(event.target.value);
  };

  handleCreateUserClick = async () => {
    this.props.showAddUserDialog();
  };

  handleEditUserClick = async () => {
    this.props.showEditUserDialog(this.props.editDataComponent.selectedUser);
  };

  handleDeleteUserClick = async () => {
    this.props.showRemoveUserDialog(this.props.editDataComponent.selectedUser);
  };

  handleAddNewModelClick = async () => {
    this.props.showAddModelDialog(this.props.editDataComponent.selectedUser);
  };

  getPossibleUsersToSelect = () => {
    let { data, editDataComponent } = this.props;

    if (!existsAndIsNotEmpty(data)) return [];
    if (!existsAndIsNotEmpty(data.usersData)) return [];

    //Sorting object before returning
    return Object.values(data.usersData)
      .sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      })
      .filter((userData) =>
        doesUsersEmailFitsFilter(userData.email, editDataComponent.filter)
      );
  };

  canUserBeEditedOrRemoved = (userId) => {
    if (!exists(userId) || userId === "") return false;

    if (!exists(this.props.data) || !exists(this.props.data.currentUserData))
      return false;

    let currentUser = this.props.data.currentUserData;
    if (isSuperAdmin(currentUser.permissions)) return true;

    let user = this.props.data.usersData[userId];

    if (!exists(this.props.data.usersData[userId])) return false;

    if (isAdmin(user.permissions) || isSuperAdmin(user.permissions))
      return false;

    return true;
  };

  renderAddUserButton = () => {
    return (
      <Button
        className={this.props.classes.userButton}
        variant="contained"
        color="primary"
        startIcon={<PersonAdd />}
        onClick={() => {
          this.handleCreateUserClick();
        }}
      >
        {this.props.t(
          "editDataComponent.userSelectComponent.addUserButtonText"
        )}
      </Button>
    );
  };

  renderEditUserButton = () => {
    let { classes, editDataComponent } = this.props;

    let buttonDisabled =
      !this.canUserBeEditedOrRemoved(editDataComponent.selectedUser) ||
      !exists(editDataComponent.selectedUser) ||
      editDataComponent.selectedUser === "";

    return (
      <Button
        className={classes.userButton}
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        disabled={buttonDisabled}
        onClick={() => {
          this.handleEditUserClick();
        }}
      >
        {this.props.t(
          "editDataComponent.userSelectComponent.editUserButtonText"
        )}
      </Button>
    );
  };

  renderDeleteUserButton = () => {
    let { classes, editDataComponent } = this.props;

    let buttonDisabled =
      !this.canUserBeEditedOrRemoved(editDataComponent.selectedUser) ||
      !exists(editDataComponent.selectedUser) ||
      editDataComponent.selectedUser === "";

    return (
      <Button
        className={classes.userButton}
        variant="contained"
        color="secondary"
        startIcon={<Delete />}
        disabled={buttonDisabled}
        onClick={() => {
          this.handleDeleteUserClick();
        }}
      >
        {this.props.t(
          "editDataComponent.userSelectComponent.deleteUserButtonText"
        )}
      </Button>
    );
  };

  renderAddModelButton = () => {
    let { classes, editDataComponent } = this.props;

    let buttonDisabled =
      !exists(editDataComponent.selectedUser) ||
      editDataComponent.selectedUser === "";

    return (
      <Button
        className={classes.addModelButton}
        variant="contained"
        color="primary"
        startIcon={<Add />}
        disabled={buttonDisabled}
        onClick={() => this.handleAddNewModelClick()}
      >
        {this.props.t(
          "editDataComponent.userSelectComponent.addModelButtonText"
        )}
      </Button>
    );
  };

  renderSelectUserInput = () => {
    let { classes, editDataComponent, t } = this.props;

    return (
      <React.Fragment>
        <InputLabel className={classes.selectUserInputLabel} shrink>
          {t("editDataComponent.userSelectComponent.SelectUserInputText")}
        </InputLabel>
        <Select
          className={classes.selectUserInput}
          value={editDataComponent.selectedUser}
          onChange={this.handleUserSelectionChange}
          fullWidth
        >
          {this.getPossibleUsersToSelect().map((userData) => (
            <MenuItem key={userData._id} value={userData._id}>
              {userData.email}
            </MenuItem>
          ))}
        </Select>
      </React.Fragment>
    );
  };

  renderFilterUserInput = () => {
    let { classes, editDataComponent, t } = this.props;

    return (
      <React.Fragment>
        <InputLabel className={classes.filterInputLabel} shrink>
          {t("editDataComponent.userSelectComponent.filterInputText")}
        </InputLabel>
        <TextField
          fullWidth
          value={editDataComponent.filter}
          onChange={this.handleFilterTextChange}
          className={classes.filterInputTextField}
        />
      </React.Fragment>
    );
  };

  render() {
    let { classes } = this.props;

    return (
      <Grid
        className={classes.userGrid}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid sm={12} md={12} lg={8} className={classes.selectUserGrid} item>
          {this.renderSelectUserInput()}
        </Grid>
        <Grid sm={12} md={12} lg={4} className={classes.filterUserGrid} item>
          {this.renderFilterUserInput()}
        </Grid>
        <Grid
          sm={12}
          lg={12}
          item
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classes.userButtonGrid}
        >
          <Grid item className={classes.userButtonGridItem}>
            {this.renderAddUserButton()}
          </Grid>
          <Grid item className={classes.userButtonGridItem}>
            {this.renderEditUserButton()}
          </Grid>
          <Grid item className={classes.userButtonGridItem}>
            {this.renderDeleteUserButton()}
          </Grid>
          <Grid item className={classes.userButtonGridItem}>
            {this.renderAddModelButton()}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    editDataComponent: state.editDataComponent,
    data: state.data,
  };
};

const componentWithStyles = withStyles(styles)(UserDataComponent);

const componentWithTrans = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  fetchAllUsersData: fetchAllUsersDataActionCreatorWrapped,
  selectUser: selectUserActionCreator,
  changeFilter: changeFilterActionCreator,
  resetFilterAndSelectedUser: resetActionCreator,
  showAddUserDialog: showAddUserDialogActionCreator,
  showEditUserDialog: showEditUserDialogActionCreator,
  showRemoveUserDialog: showRemoveUserDialogActionCreator,
  showAddModelDialog: showAddModelDialogActionCreator,
})(componentWithTrans);
