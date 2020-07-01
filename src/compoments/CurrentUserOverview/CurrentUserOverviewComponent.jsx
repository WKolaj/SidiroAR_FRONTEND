import React, { Component } from "react";
import { fetchCurrentUserDataActionCreatorWrapped } from "../../actions/data";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { HighlightOff, CheckCircleOutline } from "@material-ui/icons";
import MaterialTable from "material-table";

import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  tableRootDiv: {
    margin: theme.spacing(2),
  },
  fileExistsTypography: {},
  fileExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1),
  },
  fileExistsText: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  fileNotExistsIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    margin: theme.spacing(1),
  },
  fileNotExistsText: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
});

class CurrentUserOverviewComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchCurrentUserData();
  };

  renderFileExistsColumn = (model) => {
    let { t } = this.props;

    if (model.fileExists) {
      return (
        <Typography
          className={this.props.classes.fileExistsTypography}
          color="inherit"
        >
          <CheckCircleOutline className={this.props.classes.fileExistsIcon} />
          <span className={this.props.classes.fileExistsText}>
            {t("currentUserOverview.fileCellLabel.fileAvailable")}
          </span>
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
            {t("currentUserOverview.fileCellLabel.fileUnavailable")}
          </span>
        </Typography>
      );
    }
  };

  renderIOSFileExistsColumn = (model) => {
    let { t } = this.props;

    if (model.iosFileExists) {
      return (
        <Typography
          className={this.props.classes.fileExistsTypography}
          color="inherit"
        >
          <CheckCircleOutline className={this.props.classes.fileExistsIcon} />
          <span className={this.props.classes.fileExistsText}>
            {t("currentUserOverview.fileCellLabel.fileAvailable")}
          </span>
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
            {t("currentUserOverview.fileCellLabel.fileUnavailable")}
          </span>
        </Typography>
      );
    }
  };

  render() {
    let { classes, currentUserData, t } = this.props;

    let data =
      existsAndIsNotEmpty(currentUserData) &&
      existsAndIsNotEmpty(currentUserData.models)
        ? Object.values(currentUserData.models)
        : [];

    return (
      <div className={classes.tableRootDiv}>
        <MaterialTable
          style={{
            background: blueGrey[900],
          }}
          columns={[
            {
              title: t("currentUserOverview.mainTable.modelNameColumnName"),
              field: "name",
            },
            {
              title: t("currentUserOverview.mainTable.androidFileColumnName"),
              field: "fileExists",
              render: this.renderFileExistsColumn,
            },
            {
              title: t("currentUserOverview.mainTable.iosFileColumname"),
              field: "iosFileExists",
              render: this.renderIOSFileExistsColumn,
            },
          ]}
          data={data}
          title={t("currentUserOverview.mainTable.tableTitle")}
          options={{
            headerStyle: {
              fontWeight: "bold",
              textAlign: "left",
              background: blueGrey[900],
              fontSize: 16,
            },
            padding: "dense",
            sorting: false,
            draggable: false,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30],
          }}
          localization={{
            pagination: {
              labelDisplayedRows: t(
                "currentUserOverview.mainTable.localization.pagination.labelDisplayedRows"
              ),
              labelRowsSelect: t(
                "currentUserOverview.mainTable.localization.pagination.labelRowsSelect"
              ),
              previousAriaLabel: t(
                "currentUserOverview.mainTable.localization.pagination.previousAriaLabel"
              ),
              previousTooltip: t(
                "currentUserOverview.mainTable.localization.pagination.previousTooltip"
              ),
              nextAriaLabel: t(
                "currentUserOverview.mainTable.localization.pagination.nextAriaLabel"
              ),
              nextTooltip: t(
                "currentUserOverview.mainTable.localization.pagination.nextTooltip"
              ),
              firstTooltip: t(
                "currentUserOverview.mainTable.localization.pagination.firstTooltip"
              ),
              lastTooltip: t(
                "currentUserOverview.mainTable.localization.pagination.lastTooltip"
              ),
            },
            toolbar: {
              exportTitle: t(
                "currentUserOverview.mainTable.localization.toolbar.exportTitle"
              ),
              exportAriaLabel: t(
                "currentUserOverview.mainTable.localization.toolbar.exportAriaLabel"
              ),
              exportName: t(
                "currentUserOverview.mainTable.localization.toolbar.exportName"
              ),
              searchTooltip: t(
                "currentUserOverview.mainTable.localization.toolbar.searchTooltip"
              ),
              searchPlaceholder: t(
                "currentUserOverview.mainTable.localization.toolbar.searchPlaceholder"
              ),
            },
            body: {
              emptyDataSourceMessage: t(
                "currentUserOverview.mainTable.localization.body.emptyDataSourceMessage"
              ),
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUserData: state.data.currentUserData,
  };
};

const componentWithStyles = withStyles(styles)(CurrentUserOverviewComponent);

const componentWithTrans = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  fetchCurrentUserData: fetchCurrentUserDataActionCreatorWrapped,
})(componentWithTrans);
