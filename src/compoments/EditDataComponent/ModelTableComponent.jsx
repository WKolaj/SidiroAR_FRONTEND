import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { exists } from "../../utilities/utilities";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Edit, Delete, CloudUpload, CloudDownload } from "@material-ui/icons";
import { isAdmin, isSuperAdmin } from "../../utilities/userMethods";
import { Button, Grid } from "@material-ui/core";
import { convertUsersDataToDataToDisplay } from "../../actions/editDataComponent";
import { showRemoveModelDialogActionCreator } from "../../actions/removeModelDialog";
import { showEditModelDialogActionCreator } from "../../actions/editModelDialog";
import { fetchAndUploadFileActionCreatorWrapped } from "../../actions/file";
import { fetchAndUploadIOSFileActionCreatorWrapped } from "../../actions/iosFile";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {
  downloadModelFile,
  downloadModelIOSFile,
} from "../../services/fileService";

const styles = (theme) => ({
  materialTable: {
    background: blueGrey[900],
  },
  materialTableContainer: {
    "margin-top": 30,
  },
  toolsCellContainer: {},
  fileExistsCellContainer: {},
  toolFourButtons: {
    margin: theme.spacing(1),
    width: 110,
  },
  toolsButtonSpan: {},
});

class DataTableComponent extends Component {
  constructor(props) {
    super(props);

    //Object for storing references to upload buttons
    this.uploadButtonsFormsRef = {};

    //Object for storing references to upload buttons
    this.uploadIOSButtonsFormsRef = {};
  }

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
          onChange={(e) =>
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
          Wgraj
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
          accept=".ismdl"
          onChange={(e) =>
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
          Wgraj
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

  renderIOSFileDownload = (userId, modelId, fileExists) => {
    return (
      <Button
        className={this.props.classes.toolFourButtons}
        variant="contained"
        color="primary"
        disabled={!fileExists}
        startIcon={<CloudDownload />}
        onClick={() => {
          downloadModelIOSFile(userId, modelId);
        }}
      >
        Pobierz
      </Button>
    );
  };

  renderFileDownload = (userId, modelId, fileExists) => {
    return (
      <Button
        className={this.props.classes.toolFourButtons}
        variant="contained"
        color="primary"
        disabled={!fileExists}
        startIcon={<CloudDownload />}
        onClick={() => {
          downloadModelFile(userId, modelId);
        }}
      >
        Pobierz
      </Button>
    );
  };

  renderFileExistsColumn = (rowData) => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={this.props.classes.fileExistsCellContainer}
      >
        <Grid item>
          {this.renderUploadModelFileButton(rowData.userId, rowData.modelId)}
        </Grid>
        <Grid item>
          {this.renderFileDownload(
            rowData.userId,
            rowData.modelId,
            rowData.modelFileExists
          )}
        </Grid>
      </Grid>
    );
  };

  renderIOSFileExistsColumn = (rowData) => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={this.props.classes.fileExistsCellContainer}
      >
        <Grid item>
          {this.renderUploadModelFileIOSButton(rowData.userId, rowData.modelId)}
        </Grid>
        <Grid item>
          {this.renderIOSFileDownload(
            rowData.userId,
            rowData.modelId,
            rowData.modelIOSFileExists
          )}
        </Grid>
      </Grid>
    );
  };

  renderToolsColumn = (rowData) => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={this.props.classes.toolsCellContainer}
      >
        <Grid item>
          {this.renderEditModelButton(rowData.userId, rowData.modelId)}
        </Grid>
        <Grid item>
          {this.renderDeleteModelButton(rowData.userId, rowData.modelId)}
        </Grid>
      </Grid>
    );
  };

  handleDeleteModelClick = async (userId, modelId) => {
    this.props.showRemoveModelDialog(userId, modelId);
  };

  handleEditModelClick = async (userId, modelId) => {
    this.props.showEditModelDialog(userId, modelId);
  };

  render() {
    let { classes, data, editDataComponent } = this.props;

    let dataToDisplay = convertUsersDataToDataToDisplay(
      editDataComponent.selectedUser,
      data
    );

    return editDataComponent.selectedUser &&
      editDataComponent.selectedUser !== "" ? (
      <MaterialTable
        className={classes.materialTable}
        columns={[
          {
            title: "Nazwa modelu",
            field: "modelName",
          },
          {
            title: "Narzędzia",
            render: this.renderToolsColumn,
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Plik - Android",
            render: this.renderFileExistsColumn,
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: "Plik - IOS",
            render: this.renderIOSFileExistsColumn,
            headerStyle: {
              textAlign: "center",
            },
          },
        ]}
        data={dataToDisplay}
        options={{
          headerStyle: {
            fontWeight: "bold",
            textAlign: "left",
            background: blueGrey[900],
            fontSize: 16,
          },
          toolbar: false,
          padding: "dense",
          sorting: false,
          draggable: false,
          pageSize: 5,
          pageSizeOptions: [5],
          maxBodyHeight: 400,
          minBodyHeight: 380,
          showTitle: false,
          search: false,
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
            lastTooltip: "Ostatnia strona",
          },
          toolbar: {
            exportTitle: "Eksport",
            exportAriaLabel: "Eksport",
            exportName: "Eksportuj do CSV",
            searchTooltip: "Szukaj",
            searchPlaceholder: "Szukaj",
          },
          body: {
            emptyDataSourceMessage: "Brak dostępnych danych",
          },
        }}
        components={{
          Container: (props) => (
            <div className={classes.materialTableContainer} {...props} />
          ),
        }}
      />
    ) : null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.data ? (state.data.usersData ? state.data.usersData : []) : [],
    currentUser: state.auth.currentUser,
    editDataComponent: state.editDataComponent,
  };
};

const componentWithStyles = withStyles(styles)(DataTableComponent);

export default connect(mapStateToProps, {
  showRemoveModelDialog: showRemoveModelDialogActionCreator,
  showEditModelDialog: showEditModelDialogActionCreator,
  fetchAndUploadFile: fetchAndUploadFileActionCreatorWrapped,
  fetchAndUploadIOSFile: fetchAndUploadIOSFileActionCreatorWrapped,
})(componentWithStyles);
