import React, { Component } from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import {
  HighlightOff,
  CheckCircleOutline,
  Edit,
  Delete,
  Add,
  PersonAdd
} from "@material-ui/icons";
import {
  getUserPermissionsLabel,
  isAdmin,
  isSuperAdmin
} from "../../utilities/userMethods";
import { Button, Typography } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";

const redTheme = createMuiTheme({ palette: { primary: red } });
const blueTheme = createMuiTheme({ palette: { primary: blue } });
const greenTheme = createMuiTheme({ palette: { primary: green } });

const styles = theme => ({
  tableRootDiv: {
    margin: theme.spacing(2)
  },
  toolsCellContainer: {
    minWidth: 450,
    "text-align": "center"
  },
  toolDoubleButton: {
    margin: theme.spacing(1),
    width: 125
  },
  toolButton: {
    margin: theme.spacing(1),
    width: 250 + 2 * theme.spacing(1)
  },
  permissionsCellContainer: {
    "text-align": "center"
  },
  toolsButtonSpan: {},
  fileExistsTypography: {},
  fileExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1),
    color: green[500]
  },
  fileExistsText: {
    verticalAlign: "middle",
    display: "inline-flex",
    color: green[500]
  },
  fileNotExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1),
    color: red[500]
  },
  fileNotExistsText: {
    verticalAlign: "middle",
    display: "inline-flex",
    color: red[500]
  }
});

class DataTableComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchAllUsersData();
  };

  /**
   * @description method for generating data to be displayed - combing all - users and models to the same array
   * @param {Array} data data to be displayed
   */
  generateDataToDisplay = data => {
    let dataToDisplay = [];

    if (!existsAndIsNotEmpty(data)) return dataToDisplay;

    let allUsers = Object.values(data);

    for (let user of allUsers) {
      //Creating and adding users object to display
      let userDataToDisplay = {
        isUser: true,
        isModel: false,
        isActionsForModels: false,
        isActionsForUsers: false,
        usersId: user._id,
        usersEmail: user.email,
        usersName: user.name,
        usersPermissions: user.permissions
      };

      dataToDisplay.push(userDataToDisplay);

      let usersModels = Object.values(user.models);

      //Creating and adding users models objects to display
      for (let model of usersModels) {
        //Creating and adding users object to display
        let modelDataToDisplay = {
          isUser: false,
          isModel: true,
          isActionsForModels: false,
          isActionsForUsers: false,
          parentsId: user._id,
          modelsId: model._id,
          modelsName: model.name,
          modelsFileExists: model.filesExist
        };

        dataToDisplay.push(modelDataToDisplay);
      }

      //Generating last row - row for actions for usersModels
      let actionsDataToDisplay = {
        isUser: false,
        isModel: false,
        isActionsForModels: true,
        isActionsForUsers: false,
        parentsId: user._id
      };

      dataToDisplay.push(actionsDataToDisplay);
    }

    //Generating last row - row for actions for users
    let actionsDataToDisplay = {
      isUser: false,
      isModel: false,
      isActionsForModels: false,
      isActionsForUsers: true
    };

    dataToDisplay.push(actionsDataToDisplay);

    return dataToDisplay;
  };

  checkPermissionsToOperateOnUser(usersPermissions) {
    let { currentUser } = this.props;

    let userToEditIsAdmin =
      isAdmin(usersPermissions) || isSuperAdmin(usersPermissions);
    let currentUserIsSuperAdmin = isSuperAdmin(currentUser.permissions);
    let currentIsAdmin = isAdmin(currentUser.permissions);
    let operationEnabled =
      (userToEditIsAdmin && currentUserIsSuperAdmin) ||
      (!userToEditIsAdmin && (currentIsAdmin || currentUserIsSuperAdmin));

    return operationEnabled;
  }

  renderEditModelButton = (userId, modelId) => {
    return (
      <MuiThemeProvider theme={blueTheme}>
        <Button
          className={this.props.classes.toolDoubleButton}
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          onClick={() => {
            console.log(userId);
            console.log(modelId);
          }}
        >
          Edytuj
        </Button>
      </MuiThemeProvider>
    );
  };

  renderDeleteModelButton = (userId, modelId) => {
    return (
      <MuiThemeProvider theme={redTheme}>
        <Button
          className={this.props.classes.toolDoubleButton}
          variant="contained"
          color="primary"
          startIcon={<Delete />}
          onClick={() => {
            console.log(userId);
            console.log(modelId);
          }}
        >
          Usuń
        </Button>
      </MuiThemeProvider>
    );
  };

  renderEditUserButton = (userId, usersPermissions) => {
    return (
      <MuiThemeProvider theme={blueTheme}>
        <Button
          className={this.props.classes.toolDoubleButton}
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          disabled={!this.checkPermissionsToOperateOnUser(usersPermissions)}
          onClick={() => {
            console.log(userId);
          }}
        >
          Edytuj
        </Button>
      </MuiThemeProvider>
    );
  };

  renderDeleteUserButton = (userId, usersPermissions) => {
    return (
      <MuiThemeProvider theme={redTheme}>
        <Button
          className={this.props.classes.toolDoubleButton}
          variant="contained"
          color="primary"
          startIcon={<Delete />}
          disabled={!this.checkPermissionsToOperateOnUser(usersPermissions)}
          onClick={() => {
            console.log(userId);
          }}
        >
          Usuń
        </Button>
      </MuiThemeProvider>
    );
  };

  renderAddNewUserButton = () => {
    return (
      <MuiThemeProvider theme={greenTheme}>
        <Button
          className={this.props.classes.toolButton}
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
        >
          Dodaj użytkownika
        </Button>
      </MuiThemeProvider>
    );
  };

  renderAddNewModelButton = userId => {
    return (
      <MuiThemeProvider theme={greenTheme}>
        <Button
          className={this.props.classes.toolButton}
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => console.log(userId)}
        >
          Dodaj model
        </Button>
      </MuiThemeProvider>
    );
  };

  renderPermissionsColumn = rowData => {
    let cellContent = null;
    if (rowData.isUser)
      cellContent = getUserPermissionsLabel(rowData.usersPermissions);
    return (
      <div className={this.props.classes.permissionsCellContainer}>
        {cellContent}
      </div>
    );
  };

  renderFileExistsColumn = rowData => {
    if (rowData.isModel) {
      if (rowData.modelsFileExists) {
        return (
          <Typography className={this.props.classes.fileExistsTypography}>
            <CheckCircleOutline className={this.props.classes.fileExistsIcon} />
            <span className={this.props.classes.fileExistsText}>Dostępny</span>
          </Typography>
        );
      } else {
        return (
          <Typography className={this.props.classes.fileExistsTypography}>
            <HighlightOff className={this.props.classes.fileNotExistsIcon} />
            <span className={this.props.classes.fileNotExistsText}>
              Niedostępny
            </span>
          </Typography>
        );
      }
    } else {
      return null;
    }
  };

  renderToolsColumn = rowData => {
    let cellContent = null;

    if (rowData.isActionsForModels) {
      //parentsId is also a users id
      cellContent = (
        <span className={this.props.classes.toolsButtonSpan}>
          {this.renderAddNewModelButton(rowData.parentsId)}
        </span>
      );
    } else if (rowData.isActionsForUsers) {
      cellContent = (
        <span className={this.props.classes.toolsButtonSpan}>
          {this.renderAddNewUserButton()}
        </span>
      );
    } else if (rowData.isUser) {
      cellContent = (
        <span className={this.props.classes.toolsButtonSpan}>
          {this.renderEditUserButton(rowData.usersId, rowData.usersPermissions)}
          {this.renderDeleteUserButton(
            rowData.usersId,
            rowData.usersPermissions
          )}
        </span>
      );
    } else if (rowData.isModel) {
      //parentsId is also a users id
      cellContent = (
        <span className={this.props.classes.toolsButtonSpan}>
          {this.renderEditModelButton(rowData.parentsId, rowData.modelsId)}
          {this.renderDeleteModelButton(rowData.parentsId, rowData.modelsId)}
        </span>
      );
    }

    return (
      <div className={this.props.classes.toolsCellContainer}>{cellContent}</div>
    );
  };

  render() {
    let { classes, currentUser, data } = this.props;

    let dataToDisplay = this.generateDataToDisplay(data);

    return (
      <div className={classes.tableRootDiv}>
        <MaterialTable
          columns={[
            { title: "Email", field: "usersEmail" },
            {
              title: "Nazwa użytkownika",
              field: "usersName"
            },
            {
              title: "Uprawnienia",
              render: this.renderPermissionsColumn
            },
            { title: "Nazwa modelu", field: "modelsName" },
            {
              title: "Plik na serwerze",
              render: this.renderFileExistsColumn
            },
            {
              title: "Narzędzia",
              render: this.renderToolsColumn
            }
          ]}
          data={dataToDisplay}
          title="Użytkownicy oraz modele"
          options={{
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center"
            },
            padding: "dense",
            sorting: false,
            draggable: false
          }}
          parentChildData={(row, rows) => {
            //Checking if data row is a model or row for models actions - only model and models actions a can have parents
            if (!row.isModel && !row.isActionsForModels) return null;

            let parent = rows.find(
              element => element.usersId === row.parentsId
            );
            return parent;
          }}
          localization={{
            pagination: {
              labelDisplayedRows: `{from}-{to} z {count}`,
              labelRowsSelect: "wierszy",
              previousAriaLabel: "Poprzednia strona",
              previousTooltip: "Poprzednia strona",
              nextAriaLabel: "Następna strona",
              nextTooltip: "Następna strona",
              firstTooltip: "Pierwsza strona",
              lastTooltip: "Ostatnia strona"
            },
            toolbar: {
              exportTitle: "Eksport",
              exportAriaLabel: "Eksport",
              exportName: "Eksportuj do CSV",
              searchTooltip: "Szukaj",
              searchPlaceholder: "Szukaj"
            },
            body: {
              emptyDataSourceMessage: "Brak dostępnych danych"
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.data ? (state.data.usersData ? state.data.usersData : []) : [],
    currentUser: state.auth.currentUser
  };
};

const componentWithStyles = withStyles(styles)(DataTableComponent);

export default connect(mapStateToProps, {
  fetchAllUsersData: fetchAllUsersDataActionCreatorWrapped
})(componentWithStyles);
