import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { exists } from "../../utilities/utilities";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Edit, Delete, CloudUpload, CloudDownload } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { convertUsersDataToDataToDisplay } from "../../actions/editDataComponent";
import { showRemoveModelDialogActionCreator } from "../../actions/removeModelDialog";
import { showEditModelDialogActionCreator } from "../../actions/editModelDialog";
import { fetchAndUploadFileActionCreatorWrapped } from "../../actions/file";
import { fetchAndUploadIOSFileActionCreatorWrapped } from "../../actions/iosFile";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";
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
    width: 125,
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

  handleDeleteModelClick = async (userId, modelId) => {
    this.props.showRemoveModelDialog(userId, modelId);
  };

  handleEditModelClick = async (userId, modelId) => {
    this.props.showEditModelDialog(userId, modelId);
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
          {this.props.t("editDataComponent.modelTableComponent.uploadFileText")}
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
          {this.props.t(
            "editDataComponent.modelTableComponent.uploadIOSFileText"
          )}
        </Button>
      </React.Fragment>
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
        {this.props.t("editDataComponent.modelTableComponent.downloadFileText")}
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
        {this.props.t(
          "editDataComponent.modelTableComponent.downloadIOSFileText"
        )}
      </Button>
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
        {this.props.t(
          "editDataComponent.modelTableComponent.editModelButtonText"
        )}
      </Button>
    );
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
        {this.props.t(
          "editDataComponent.modelTableComponent.deleteModelButtonText"
        )}
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

  render() {
    let { classes, data, editDataComponent, t } = this.props;

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
            title: t(
              "editDataComponent.modelTableComponent.table.modelNameColumnName"
            ),
            field: "modelName",
          },
          {
            title: t(
              "editDataComponent.modelTableComponent.table.toolsColumnName"
            ),
            render: this.renderToolsColumn,
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: t(
              "editDataComponent.modelTableComponent.table.androidFileColumnName"
            ),
            render: this.renderFileExistsColumn,
            headerStyle: {
              textAlign: "center",
            },
          },
          {
            title: t(
              "editDataComponent.modelTableComponent.table.iosFileColumnName"
            ),
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
            labelDisplayedRows: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.labelDisplayedRows"
            ),
            labelRowsSelect: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.labelRowsSelect"
            ),
            previousAriaLabel: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.previousAriaLabel"
            ),
            previousTooltip: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.previousTooltip"
            ),
            nextAriaLabel: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.nextAriaLabel"
            ),
            nextTooltip: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.nextTooltip"
            ),
            firstTooltip: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.firstTooltip"
            ),
            lastTooltip: t(
              "editDataComponent.modelTableComponent.table.localization.pagination.lastTooltip"
            ),
          },
          toolbar: {
            exportTitle: t(
              "editDataComponent.modelTableComponent.table.localization.toolbar.exportTitle"
            ),
            exportAriaLabel: t(
              "editDataComponent.modelTableComponent.table.localization.toolbar.exportAriaLabel"
            ),
            exportName: t(
              "editDataComponent.modelTableComponent.table.localization.toolbar.exportName"
            ),
            searchTooltip: t(
              "editDataComponent.modelTableComponent.table.localization.toolbar.searchTooltip"
            ),
            searchPlaceholder: t(
              "editDataComponent.modelTableComponent.table.localization.toolbar.searchPlaceholder"
            ),
          },
          body: {
            emptyDataSourceMessage: t(
              "editDataComponent.modelTableComponent.table.localization.body.emptyDataSourceMessage"
            ),
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

const componentWithTrans = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showRemoveModelDialog: showRemoveModelDialogActionCreator,
  showEditModelDialog: showEditModelDialogActionCreator,
  fetchAndUploadFile: fetchAndUploadFileActionCreatorWrapped,
  fetchAndUploadIOSFile: fetchAndUploadIOSFileActionCreatorWrapped,
})(componentWithTrans);
