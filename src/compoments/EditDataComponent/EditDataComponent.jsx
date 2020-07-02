import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ModelTableComponent from "./ModelTableComponent";
import {
  changeFilterActionCreator,
  selectUserActionCreator,
  fetchDataToDisplayActionCreator,
  resetActionCreator,
  doesUsersEmailFitsFilter,
} from "../../actions/editDataComponent";
import {
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Paper,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import {
  HighlightOff,
  CheckCircleOutline,
  Edit,
  Delete,
  Add,
  PersonAdd,
  CloudUpload,
} from "@material-ui/icons";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { showAddUserDialogActionCreator } from "../../actions/addUserDialog";
import { showEditUserDialogActionCreator } from "../../actions/editUserDialog";
import { showRemoveUserDialogActionCreator } from "../../actions/removeUserDialog";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import blueGrey from "@material-ui/core/colors/blueGrey";

const styles = (theme) => ({
  mainPaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    background: blueGrey[900],
  },
  mainTitle: {
    "margin-left": 10,
  },
  userGrid: {
    padding: 10,
  },
  selectUserGrid: {
    "padding-right": 10,
    "padding-top": 20,
  },
  filterUserGrid: {
    "padding-right": 10,
    "padding-top": 20,
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

class EditDataComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchAllUsersData();
    await this.props.resetFilterAndSelectedUser();
  };

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

  handleEditUserClick = async (userId) => {
    this.props.showEditUserDialog(userId);
  };

  handleDeleteUserClick = async (userId) => {
    this.props.showRemoveUserDialog(userId);
  };

  getPossibleUsersToSelect = () => {
    let { data, editDataComponent } = this.props;

    if (!existsAndIsNotEmpty(data)) return [];
    if (!existsAndIsNotEmpty(data.usersData)) return [];

    return Object.values(data.usersData).filter((userData) =>
      doesUsersEmailFitsFilter(userData.email, editDataComponent.filter)
    );
  };

  renderUserSelection = () => {
    let { editDataComponent, classes, data } = this.props;

    return (
      <Grid
        className={classes.userGrid}
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid sm={12} md={12} lg={8} className={classes.selectUserGrid} item>
          <InputLabel className={classes.selectUserInputLabel} shrink>
            Wybierz użytkownika
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
        </Grid>
        <Grid sm={12} md={12} lg={4} className={classes.filterUserGrid} item>
          <InputLabel className={classes.filterInputLabel} shrink>
            Filtr
          </InputLabel>
          <TextField
            fullWidth
            value={editDataComponent.filter}
            onChange={this.handleFilterTextChange}
            className={classes.filterInputTextField}
          />
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
            <Button
              className={this.props.classes.userButton}
              variant="contained"
              color="primary"
              startIcon={<PersonAdd />}
              onClick={() => {
                this.handleCreateUserClick();
              }}
            >
              Dodaj
            </Button>
          </Grid>
          <Grid item className={classes.userButtonGridItem}>
            <Button
              className={this.props.classes.userButton}
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              disabled={
                !exists(editDataComponent.selectedUser) ||
                editDataComponent.selectedUser === ""
              }
              onClick={() => {
                this.handleEditUserClick(editDataComponent.selectedUser);
              }}
            >
              Edytuj
            </Button>
          </Grid>
          <Grid item className={classes.userButtonGridItem}>
            <Button
              className={this.props.classes.userButton}
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              disabled={
                !exists(editDataComponent.selectedUser) ||
                editDataComponent.selectedUser === ""
              }
              onClick={() => {
                this.handleDeleteUserClick(editDataComponent.selectedUser);
              }}
            >
              Usuń
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    let { editDataComponent, classes, data } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.mainPaper}>
          <Typography variant="h6" className={classes.mainTitle}>
            {exists(editDataComponent.selectedUser) &&
            editDataComponent.selectedUser !== ""
              ? `Użytkownik: ${
                  data.usersData[editDataComponent.selectedUser].name
                }`
              : "Użytkownicy"}
          </Typography>
          {this.renderUserSelection()}
        </Paper>
        <ModelTableComponent></ModelTableComponent>
      </React.Fragment>
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

export default connect(mapStateToProps, {
  fetchAllUsersData: fetchAllUsersDataActionCreatorWrapped,
  selectUser: selectUserActionCreator,
  fetchDataToDisplay: fetchDataToDisplayActionCreator,
  changeFilter: changeFilterActionCreator,
  resetFilterAndSelectedUser: resetActionCreator,
  showAddUserDialog: showAddUserDialogActionCreator,
  showEditUserDialog: showEditUserDialogActionCreator,
  showRemoveUserDialog: showRemoveUserDialogActionCreator,
})(componentWithStyles);
