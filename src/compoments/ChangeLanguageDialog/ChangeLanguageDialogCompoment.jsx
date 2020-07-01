import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {} from "../../actions/language";
import { changeLanguageActionCreator } from "../../actions/language";
import { hideChangeLanguageDialogActionCreator } from "../../actions/changeLanguageDialog";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import { withTranslation } from "react-i18next";

const styles = (theme) => {
  return {
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
    textField: {},
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block",
    },
    errorLabel: {
      color: red[900],
      display: "block",
    },
    selectField: {},
    selectFieldDiv: {
      "margin-bottom": theme.spacing(1),
      display: "block",
    },
  };
};

class ChangeLanguageDialog extends Component {
  handleLanguageButtonClicked = async (newLang) => {
    let { changeLanguage, hideChangeLanguageDialog } = this.props;

    await hideChangeLanguageDialog();
    await changeLanguage(newLang);
  };

  render() {
    let { changeLanguageDialog, classes, t } = this.props;

    return (
      <div>
        <Dialog
          open={changeLanguageDialog.visible}
          className={classes.dialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              width: "fit-content",
              height: "fit-content",
              minWidth: 500,
              background: blueGrey[900],
            },
          }}
        >
          <DialogTitle className={classes.dialogTitle}>
            {t("changeLanguageDialog.title")}
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            {t("changeLanguageDialog.content")}
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              style={{ minWidth: 125 }}
              onClick={() => {
                this.handleLanguageButtonClicked("pl");
              }}
            >
              {t("changeLanguageDialog.buttons.pl")}
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ minWidth: 125 }}
              onClick={() => {
                this.handleLanguageButtonClicked("en");
              }}
            >
              {t("changeLanguageDialog.buttons.en")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    changeLanguageDialog: state.changeLanguageDialog,
  };
};

const componentWithStyles = withStyles(styles)(ChangeLanguageDialog);

const componentWithTranslation = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  changeLanguage: changeLanguageActionCreator,
  hideChangeLanguageDialog: hideChangeLanguageDialogActionCreator,
})(componentWithTranslation);
