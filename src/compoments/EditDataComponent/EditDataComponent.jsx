import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ModelTableComponent from "./ModelTableComponent";
import UserDataComponent from "./UserDataComponent";
import {
  changeFilterActionCreator,
  selectUserActionCreator,
  resetActionCreator,
} from "../../actions/editDataComponent";
import { Paper, Typography } from "@material-ui/core";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { showAddUserDialogActionCreator } from "../../actions/addUserDialog";
import { showEditUserDialogActionCreator } from "../../actions/editUserDialog";
import { showRemoveUserDialogActionCreator } from "../../actions/removeUserDialog";
import { showAddModelDialogActionCreator } from "../../actions/addModelDialog";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  mainPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    background: blueGrey[900],
  },
  mainTitle: {
    "margin-left": 10,
  },
});

class EditDataComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchAllUsersData();
    await this.props.resetFilterAndSelectedUser();
  };

  checkIfUserIsSelectedAndExists = () => {
    let { editDataComponent, data } = this.props;

    //Checking is user is selected
    if (
      !exists(editDataComponent.selectedUser) ||
      editDataComponent.selectedUser === ""
    )
      return false;

    //Checking if user exists
    if (
      !existsAndIsNotEmpty(data) ||
      !existsAndIsNotEmpty(data.usersData) ||
      !existsAndIsNotEmpty(data.usersData[editDataComponent.selectedUser])
    )
      return false;

    return true;
  };

  renderMainTitle = () => {
    let { editDataComponent, classes, data, t } = this.props;

    return (
      <Typography variant="h6" className={classes.mainTitle}>
        {this.checkIfUserIsSelectedAndExists()
          ? `${t("editDataComponent.userLabel.selectedUserText")}: ${
              data.usersData[editDataComponent.selectedUser].name
            }`
          : t("editDataComponent.userLabel.unselectedUserText")}
      </Typography>
    );
  };

  render() {
    let { classes } = this.props;

    return (
      <Paper className={classes.mainPaper}>
        {this.renderMainTitle()}
        <UserDataComponent />
        <ModelTableComponent />
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    editDataComponent: state.editDataComponent,
    data: state.data,
  };
};

const componentWithStyles = withStyles(styles)(EditDataComponent);

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
