import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import {
  HighlightOff,
  CheckCircleOutline,
  Edit,
  Delete,
  Add,
  PersonAdd,
  CloudUpload
} from "@material-ui/icons";
import {
  getUserPermissionsLabel,
  isAdmin,
  isSuperAdmin
} from "../../utilities/userMethods";
import { Button, Typography } from "@material-ui/core";
import { showAddUserDialogActionCreator } from "../../actions/addUserDialog";
import { showEditUserDialogActionCreator } from "../../actions/editUserDialog";
import { showRemoveUserDialogActionCreator } from "../../actions/removeUserDialog";
import { showRemoveModelDialogActionCreator } from "../../actions/removeModelDialog";
import { showAddModelDialogActionCreator } from "../../actions/addModelDialog";
import { showEditModelDialogActionCreator } from "../../actions/editModelDialog";
import { fetchAndUploadFileActionCreatorWrapped } from "../../actions/file";
import { fetchAndUploadIOSFileActionCreatorWrapped } from "../../actions/iosFile";
import blueGrey from "@material-ui/core/colors/blueGrey";

const styleOfUserCell = {
  background: blueGrey[900]
};
const styleOfModelCell = {
  background: blueGrey[800]
};

const styles = theme => ({
  tableRootDiv: {
    margin: theme.spacing(2)
  },
  toolsCellContainer: {
    minWidth: 600,
    "text-align": "center"
  },
  toolDoubleButton: {
    margin: theme.spacing(1),
    width: 110 * 2 + 2 * theme.spacing(1)
  },
  toolFourButtons: {
    margin: theme.spacing(1),
    width: 110
  },
  toolButton: {
    margin: theme.spacing(1),
    width: 110 * 4 + 6 * theme.spacing(1)
  },
  permissionsCellContainer: {
    "text-align": "center"
  },
  toolsButtonSpan: {},
  fileExistsTypography: {},
  fileExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1)
  },
  fileExistsText: {
    verticalAlign: "middle",
    display: "inline-flex"
  },
  fileNotExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1)
  },
  fileNotExistsText: {
    verticalAlign: "middle",
    display: "inline-flex"
  }
});

class DataTableComponent extends Component {
  constructor(props) {
    super(props);

    //Object for storing references to upload buttons
    this.uploadButtonsFormsRef = {};

    //Object for storing references to upload buttons
    this.uploadIOSButtonsFormsRef = {};
  }

  componentDidMount = async () => {
    await this.props.fetchAllUsersData();
  };

  getCellStyle = (text, rowData) => {
    if (rowData.isActionsForModels) return styleOfModelCell;

    if (rowData.isActionsForUsers) return styleOfUserCell;

    if (rowData.isUser) return styleOfUserCell;

    if (rowData.isModel) return styleOfModelCell;

    return styleOfUserCell;
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
          modelsFileExists: model.fileExists,
          modelsIOSFileExists: model.iosFileExists
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

  createUploadModelFileButtonRefIfNotExists = (userId, modelId) => {
    if (!exists(this.uploadButtonsFormsRef[userId]))
      this.uploadButtonsFormsRef[userId] = {};

    if (!exists(this.uploadButtonsFormsRef[userId][modelId]))
      this.uploadButtonsFormsRef[userId][modelId] = React.createRef();
  };

  createUploadModelIOSFileButtonRefIfNotExists = (userId, modelId) => {
    if (!exists(this.uploadIOSButtonsFormsRef[userId]))
      this.uploadIOSButtonsFormsRef[userId] = {};

    if (!exists(this.uploadIOSButtonsFormsRef[userId][modelId]))
      this.uploadIOSButtonsFormsRef[userId][modelId] = React.createRef();
  };

  renderUploadModelFileButton = (userId, modelId) => {
    this.createUploadModelFileButtonRefIfNotExists(userId, modelId);

    return (
      <React.Fragment>
        <input
          ref={this.uploadButtonsFormsRef[userId][modelId]}
          style={{ display: "none" }}
          type="file"
          accept=".smdl"
          onChange={e =>
            this.handleUploadModelFileFormChanged(e, userId, modelId)
          }
        />
        <Button
          className={this.props.classes.toolFourButtons}
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={() => this.handleUploadModelFileButtonClick(userId, modelId)}
        >
          Android
        </Button>
      </React.Fragment>
    );
  };

  renderUploadModelFileIOSButton = (userId, modelId) => {
    this.createUploadModelIOSFileButtonRefIfNotExists(userId, modelId);

    return (
      <React.Fragment>
        <input
          ref={this.uploadIOSButtonsFormsRef[userId][modelId]}
          style={{ display: "none" }}
          type="file"
          accept=".smdl"
          onChange={e =>
            this.handleUploadModelIOSFileFormChanged(e, userId, modelId)
          }
        />
        <Button
          className={this.props.classes.toolFourButtons}
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={() =>
            this.handleUploadModelIOSFileButtonClick(userId, modelId)
          }
        >
          IOS
        </Button>
      </React.Fragment>
    );
  };

  renderEditModelButton = (userId, modelId) => {
    return (
      <Button
        className={this.props.classes.toolFourButtons}
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        onClick={() => this.handleEditModelClick(userId, modelId)}
      >
        Edytuj
      </Button>
    );
  };

  handleUploadModelFileFormChanged = async (e, userId, modelId) => {
    await this.props.fetchAndUploadFile(userId, modelId, e.target.files[0]);
  };

  handleUploadModelFileButtonClick = (userId, modelId) => {
    let formRef = this.uploadButtonsFormsRef[userId][modelId];
    formRef.current.click();
  };

  handleUploadModelIOSFileFormChanged = async (e, userId, modelId) => {
    await this.props.fetchAndUploadIOSFile(userId, modelId, e.target.files[0]);
  };

  handleUploadModelIOSFileButtonClick = (userId, modelId) => {
    let formRef = this.uploadIOSButtonsFormsRef[userId][modelId];
    formRef.current.click();
  };

  renderDeleteModelButton = (userId, modelId) => {
    return (
      <Button
        className={this.props.classes.toolFourButtons}
        variant="contained"
        color="secondary"
        startIcon={<Delete />}
        onClick={() => {
          this.handleDeleteModelClick(userId, modelId);
        }}
      >
        Usuń
      </Button>
    );
  };

  renderEditUserButton = (userId, usersPermissions) => {
    return (
      <Button
        className={this.props.classes.toolDoubleButton}
        variant="contained"
        color="primary"
        startIcon={<Edit />}
        disabled={!this.checkPermissionsToOperateOnUser(usersPermissions)}
        onClick={() => {
          this.handleEditUserClick(userId);
        }}
      >
        Edytuj
      </Button>
    );
  };

  renderDeleteUserButton = (userId, usersPermissions) => {
    return (
      <Button
        className={this.props.classes.toolDoubleButton}
        variant="contained"
        color="secondary"
        startIcon={<Delete />}
        disabled={!this.checkPermissionsToOperateOnUser(usersPermissions)}
        onClick={() => this.handleDeleteUserClick(userId)}
      >
        Usuń
      </Button>
    );
  };

  renderAddNewUserButton = () => {
    return (
      <Button
        className={this.props.classes.toolButton}
        variant="contained"
        color="primary"
        startIcon={<PersonAdd />}
        onClick={this.handleCreateUserClick}
      >
        Dodaj użytkownika
      </Button>
    );
  };

  renderAddNewModelButton = userId => {
    return (
      <Button
        className={this.props.classes.toolButton}
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => this.handleAddNewModelClick(userId)}
      >
        Dodaj model
      </Button>
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
          <Typography
            className={this.props.classes.fileExistsTypography}
            color="inherit"
          >
            <CheckCircleOutline className={this.props.classes.fileExistsIcon} />
            <span className={this.props.classes.fileExistsText}>Dostępny</span>
          </Typography>
        );
      } else {
        return (
          <Typography
            className={this.props.classes.fileExistsTypography}
            color="secondary"
          >
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

  renderIOSFileExistsColumn = rowData => {
    if (rowData.isModel) {
      if (rowData.modelsIOSFileExists) {
        return (
          <Typography
            className={this.props.classes.fileExistsTypography}
            color="inherit"
          >
            <CheckCircleOutline className={this.props.classes.fileExistsIcon} />
            <span className={this.props.classes.fileExistsText}>Dostępny</span>
          </Typography>
        );
      } else {
        return (
          <Typography
            className={this.props.classes.fileExistsTypography}
            color="secondary"
          >
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
          {this.renderUploadModelFileButton(
            rowData.parentsId,
            rowData.modelsId
          )}
          {this.renderUploadModelFileIOSButton(
            rowData.parentsId,
            rowData.modelsId
          )}
          {this.renderDeleteModelButton(rowData.parentsId, rowData.modelsId)}
        </span>
      );
    }

    return (
      <div className={this.props.classes.toolsCellContainer}>{cellContent}</div>
    );
  };

  handleCreateUserClick = async () => {
    this.props.showAddUserDialog();
  };

  handleEditUserClick = async userId => {
    this.props.showEditUserDialog(userId);
  };

  handleDeleteUserClick = async userId => {
    this.props.showRemoveUserDialog(userId);
  };

  handleAddNewModelClick = async userId => {
    this.props.showAddModelDialog(userId);
  };

  handleDeleteModelClick = async (userId, modelId) => {
    this.props.showRemoveModelDialog(userId, modelId);
  };

  handleEditModelClick = async (userId, modelId) => {
    this.props.showEditModelDialog(userId, modelId);
  };

  render() {
    let { classes, data } = this.props;

    let dataToDisplay = this.generateDataToDisplay(data);

    return (
      <div className={classes.tableRootDiv}>
        <MaterialTable
          style={{
            background: blueGrey[900]
          }}
          columns={[
            {
              title: "Email",
              field: "usersEmail",
              cellStyle: {
                fontWeight: "bold"
              }
            },
            {
              title: "Nazwa modelu",
              field: "modelsName",
              cellStyle: this.getCellStyle
            },
            {
              title: "Android - Plik na serwerze",
              render: this.renderFileExistsColumn,
              cellStyle: this.getCellStyle
            },
            {
              title: "IOS - Plik na serwerze",
              render: this.renderIOSFileExistsColumn,
              cellStyle: this.getCellStyle
            },
            {
              title: "Narzędzia",
              render: this.renderToolsColumn,
              cellStyle: this.getCellStyle,
              headerStyle: {
                textAlign: "center"
              }
            }
          ]}
          data={dataToDisplay}
          title="Użytkownicy oraz modele"
          options={{
            headerStyle: {
              fontWeight: "bold",
              textAlign: "left",
              background: blueGrey[900],
              fontSize: 16
            },
            padding: "dense",
            sorting: false,
            draggable: false,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30]
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
  fetchAllUsersData: fetchAllUsersDataActionCreatorWrapped,
  showAddUserDialog: showAddUserDialogActionCreator,
  showEditUserDialog: showEditUserDialogActionCreator,
  showRemoveUserDialog: showRemoveUserDialogActionCreator,
  showAddModelDialog: showAddModelDialogActionCreator,
  showRemoveModelDialog: showRemoveModelDialogActionCreator,
  showEditModelDialog: showEditModelDialogActionCreator,
  fetchAndUploadFile: fetchAndUploadFileActionCreatorWrapped,
  fetchAndUploadIOSFile: fetchAndUploadIOSFileActionCreatorWrapped
})(componentWithStyles);
