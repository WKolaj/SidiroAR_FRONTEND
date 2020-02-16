import React, { Component } from "react";
import { fetchCurrentUserDataActionCreatorWrapped } from "../../actions/data";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { HighlightOff, CheckCircleOutline } from "@material-ui/icons";
import MaterialTable from "material-table";

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
    if (model.filesExist) {
      return (
        <Typography
          className={this.props.classes.fileExistsTypography}
          color="primary"
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
          columns={[
            { title: "Nazwa modelu", field: "name" },
            {
              title: "Dostępność pliku na serwerze",
              field: "filesExist",
              render: this.renderFileExistsColumn
            }
          ]}
          data={data}
          title="Dostępne modele"
          options={{
            headerStyle: {
              fontWeight: "bold"
            }
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
