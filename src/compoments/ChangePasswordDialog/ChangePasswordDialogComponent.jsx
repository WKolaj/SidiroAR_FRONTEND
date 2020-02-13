import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import { passwordSchema } from "../../validation/validation";
import Joi from "joi-browser";
import {
  hideChangePasswordDialogActionCreator,
  changePasswordActionCreator
} from "../../actions/changePasswordDialog";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
  Button
} from "@material-ui/core";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";

const styles = theme => ({
  dialog: {},
  dialogTitle: {},
  dialogContent: {},
  textField: {},
  textFieldDiv: {
    "margin-bottom": theme.spacing(1),
    display: "block"
  },
  selectField: {},
  selectFieldDiv: {
    "margin-bottom": theme.spacing(1),
    display: "block"
  },
  errorLabel: {
    color: "red",
    display: "block"
  },
  inputLabel: {}
});

class ChangePasswordDialogComponent extends Component {
  //Method for rendering single Field of form
  renderField = ({
    input,
    label,
    disabled,
    type,
    meta: { touched, error, warning }
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

  //TO use later in user edit form
  // renderPermissionsSelect = ({
  //   input,
  //   label,
  //   disabled,
  //   meta: { touched, error, warning }
  // }) => (
  //   <div className={this.props.classes.selectFieldDiv}>
  //     <InputLabel className={this.props.classes.inputLabel} shrink>
  //       {label}
  //     </InputLabel>
  //     <Select
  //       className={this.props.classes.selectField}
  //       {...input}
  //       placeholder={label}
  //       label={label}
  //       disabled={disabled}
  //       fullWidth
  //     >
  //       <MenuItem value={1}>Użytkownik</MenuItem>
  //       <MenuItem value={3}>Administrator</MenuItem>
  //       <MenuItem value={7}>SuperAdmin</MenuItem>
  //     </Select>
  //   </div>
  // );

  handleEditClicked = async () => {
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
    let { classes, changePasswordDialog, formData } = this.props;
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
              height: "fit-content"
            }
          }}
        >
          <DialogTitle className={classes.dialogTitle}>
            Zmiana hasła
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Field
              name="newPassword"
              type="password"
              component={this.renderField}
              label="Nowe hasło"
            />
            <Field
              name="oldPassword"
              type="password"
              component={this.renderField}
              label="Poprzednie hasło"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancelClicked} color="secondary">
              Anuluj
            </Button>
            <Button
              onClick={this.handleEditClicked}
              disabled={
                !exists(formData) ||
                (exists(formData) &&
                  (exists(formData.syncErrors) || !formData.anyTouched))
              }
              color="primary"
            >
              Zmień
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const validate = formData => {
  let result = Joi.validate(formData, passwordSchema, { abortEarly: false });
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
    currentUserData: state.data.currentUserData
  };
};

const componentWithStyles = withStyles(styles)(ChangePasswordDialogComponent);

const formComponentWithStyles = reduxForm({
  form: "changePasswordDialog",
  validate: validate
})(componentWithStyles);

export default connect(mapStateToProps, {
  hideChangePasswordDialog: hideChangePasswordDialogActionCreator,
  changePassword: changePasswordActionCreator
})(formComponentWithStyles);
