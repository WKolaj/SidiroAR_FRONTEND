import React, { Component } from "react";
import { fetchCurrentUserDataActionCreatorWrapped } from "../../actions/data";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { HighlightOff, CheckCircleOutline } from "@material-ui/icons";
import MaterialTable from "material-table";

import blueGrey from "@material-ui/core/colors/blueGrey";

const styles = theme => ({
  tableRootDiv: {
    margin: theme.spacing(2)
  },
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

class CurrentUserOverviewComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchCurrentUserData();
  };

  renderFileExistsColumn = model => {
    if (model.fileExists) {
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
  };

  renderIOSFileExistsColumn = model => {
    if (model.iosFileExists) {
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
  };

  render() {
    let { classes, currentUserData } = this.props;

    let data =
      existsAndIsNotEmpty(currentUserData) &&
      existsAndIsNotEmpty(currentUserData.models)
        ? Object.values(currentUserData.models)
        : [];

    return (
      <div className={classes.tableRootDiv}>
        <MaterialTable
          style={{
            background: blueGrey[900]
          }}
          columns={[
            { title: "Nazwa modelu", field: "name" },
            {
              title: "Android - plik na serwerze",
              field: "fileExists",
              render: this.renderFileExistsColumn
            },
            {
              title: "IOS - plik na serwerze",
              field: "fileExists",
              render: this.renderIOSFileExistsColumn
            }
          ]}
          data={data}
          title="Dostępne modele"
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
    currentUserData: state.data.currentUserData
  };
};

const componentWithStyles = withStyles(styles)(CurrentUserOverviewComponent);

export default connect(mapStateToProps, {
  fetchCurrentUserData: fetchCurrentUserDataActionCreatorWrapped
})(componentWithStyles);
