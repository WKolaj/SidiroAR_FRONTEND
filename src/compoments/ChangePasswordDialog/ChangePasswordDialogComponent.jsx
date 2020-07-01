import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm, Form } from "redux-form";
import { passwordSchema } from "../../validation/validation";
import {
  hideChangePasswordDialogActionCreator,
  changePasswordActionCreator,
} from "../../actions/changePasswordDialog";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  dialog: {},
  dialogTitle: {},
  dialogContent: {},
  textField: {
    background: blueGrey[900],
  },
  textFieldDiv: {
    "margin-bottom": theme.spacing(1),
    display: "block",
    background: blueGrey[900],
  },
  selectField: {},
  selectFieldDiv: {
    "margin-bottom": theme.spacing(1),
    display: "block",
  },
  errorLabel: {
    color: red[900],
    display: "block",
  },
  inputLabel: {},
});

class ChangePasswordDialogComponent extends Component {
  //Method for rendering single Field of form
  renderField = ({
    input,
    label,
    disabled,
    type,
    meta: { touched, error, warning },
  }) => (
    <div className={this.props.classes.textFieldDiv}>
      <TextField
        className={this.props.classes.textField}
        {...input}
        placeholder={label}
        label={label}
        type={type}
        disabled={disabled}
        fullWidth
      />
      {touched &&
        ((error && (
          <FormHelperText className={this.props.classes.errorLabel}>
            {error}
          </FormHelperText>
        )) ||
          (warning && (
            <FormHelperText className={this.props.classes.errorLabel}>
              {warning}
            </FormHelperText>
          )))}
    </div>
  );

  handleSubmit = async (e) => {
    //Editing user only if formData and its values exists
    if (
      existsAndIsNotEmpty(this.props.formData) &&
      existsAndIsNotEmpty(this.props.formData.values)
    ) {
      //Window will be closed automatically by login in action
      await this.props.changePassword(
        this.props.formData.values.newPassword,
        this.props.formData.values.oldPassword
      );
    }
  };

  handleCancelClicked = async () => {
    this.props.hideChangePasswordDialog();
  };

  render() {
    let {
      classes,
      changePasswordDialog,
      formData,
      handleSubmit,
      t,
    } = this.props;
    return (
      <div>
        <Dialog
          open={changePasswordDialog.visible}
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
          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <DialogTitle className={classes.dialogTitle}>
              {t("changePasswordDialog.dialogTitle")}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Field
                name="newPassword"
                type="password"
                component={this.renderField}
                label={t("changePasswordDialog.newPasswordFieldLabel")}
              />
              <Field
                name="oldPassword"
                type="password"
                component={this.renderField}
                label={t("changePasswordDialog.oldPasswordFieldLabel")}
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                disabled={
                  !exists(formData) ||
                  (exists(formData) &&
                    (exists(formData.syncErrors) || !formData.anyTouched))
                }
                color="secondary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                {t("changePasswordDialog.changePasswordButtonText")}
              </Button>
              <Button
                onClick={this.handleCancelClicked}
                color="primary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                {t("changePasswordDialog.cancelButtonText")}
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const validate = (formData) => {
  let result = passwordSchema.validate(formData, { abortEarly: false });
  if (!result.error) return {};

  let objectToReturn = {};

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const mapStateToProps = (state, props) => {
  return {
    changePasswordDialog: state.changePasswordDialog,
    formData: state.form.changePasswordDialog,
    currentUserData: state.data.currentUserData,
  };
};

const componentWithStyles = withStyles(styles)(ChangePasswordDialogComponent);

const componentWithTrans = withTranslation()(componentWithStyles);

const formComponentWithStyles = reduxForm({
  form: "changePasswordDialog",
  validate: validate,
})(componentWithTrans);

export default connect(mapStateToProps, {
  hideChangePasswordDialog: hideChangePasswordDialogActionCreator,
  changePassword: changePasswordActionCreator,
})(formComponentWithStyles);
