import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormHelperText,
  TextField
} from "@material-ui/core";
import { Field, reduxForm, Form } from "redux-form";
import FieldFileInput from "../FieldFileInput/FieldFileInput";
import { createModelSchema } from "../../validation/validation";
import Joi from "joi-browser";
import {
  showAddModelDialogActionCreator,
  hideAddModelDialogActionCreator,
  createModelAndUploadFilesWrapped
} from "../../actions/addModelDialog";
import { maxFileSize } from "../../actions/file";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin } from "../../utilities/userMethods";
import _ from "lodash";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

const styles = theme => {
  return {
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
    inputFileDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block"
    },
    inputFile: {},
    textField: {
      background: blueGrey[900]
    },
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block",
      background: blueGrey[900]
    },
    errorLabel: {
      color: red[900],
      display: "block"
    },
    selectField: {},
    selectFieldDiv: {
      background: blueGrey[800],
      "margin-bottom": theme.spacing(1),
      display: "block"
    }
  };
};

class AddModelDialog extends Component {
  //Method for rendering single Field of form
  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={this.props.classes.textFieldDiv}>
      <TextField
        className={this.props.classes.textField}
        {...input}
        label={label}
        placeholder={label}
        type={type}
        fullWidth
        autoComplete="off"
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

  //Method for rendering single File Field of form
  renderFileField = ({ input, label, meta: { error, warning } }) => {
    //Detecting touched as file
    let values = this.props.formData.values;
    let fileSelected = exists(values) && exists(values.file);

    return (
      <div className={this.props.classes.inputFileDiv}>
        <FieldFileInput
          className={this.props.classes.inputFile}
          {...input}
          type="file"
          label={label}
          fullWidth
        />
        {fileSelected &&
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
  };

  //Method for rendering single File Field of form
  renderIOSFileField = ({ input, label, meta: { error, warning } }) => {
    //Detecting touched as file
    let values = this.props.formData.values;
    let fileSelected = exists(values) && exists(values.iosFile);

    return (
      <div className={this.props.classes.inputFileDiv}>
        <FieldFileInput
          className={this.props.classes.inputFile}
          {...input}
          type="file"
          label={label}
          fullWidth
        />
        {fileSelected &&
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
  };

  handleSubmit = async e => {
    let {
      formData,
      syncErrors,
      addModelDialog,
      createModelAndUploadFiles,
      hideAddModelDialog,
      reset
    } = this.props;
    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    let modelPayload = _.pick(formData.values, "name");
    let { userId } = addModelDialog;

    await createModelAndUploadFiles(
      userId,
      modelPayload,
      formData.values.file,
      formData.values.iosFile
    );

    reset();
    await hideAddModelDialog();
  };

  handleCancelClicked = async () => {
    let { hideAddModelDialog, reset } = this.props;
    reset();
    await hideAddModelDialog();
  };

  checkUsersPermissions = user => {
    if (!existsAndIsNotEmpty(user)) return false;
    if (!exists(user.permissions)) return false;

    return isAdmin(user.permissions);
  };

  render() {
    let {
      currentUser,
      addModelDialog,
      classes,
      hideAddModelDialog,
      formData,
      handleSubmit
    } = this.props;
    let usersPermissionsValid = this.checkUsersPermissions(currentUser);

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (addModelDialog.visible) hideAddModelDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={addModelDialog.visible}
          className={classes.dialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              width: "fit-content",
              height: "fit-content",
              minWidth: 500,
              background: blueGrey[900]
            }
          }}
        >
          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <DialogTitle className={classes.dialogTitle}>
              Utwórz nowy model
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Field
                name="name"
                type="text"
                component={this.renderField}
                label="Nazwa"
              />
              <Field
                name="file"
                component={this.renderFileField}
                label="Plik Android"
              />
              <Field
                name="iosFile"
                component={this.renderIOSFileField}
                label="Plik IOS"
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
                Utwórz
              </Button>
              <Button
                onClick={this.handleCancelClicked}
                color="primary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                Anuluj
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      </div>
    );
  }
}

const validate = (formData, props) => {
  let objectToReturn = {};

  if (exists(formData.file)) {
    //Checking if max file size exceeds
    if (formData.file.size >= maxFileSize)
      objectToReturn.file = `File cannot exceed ${(
        maxFileSize /
        1024 /
        1024
      ).toFixed(2)} MB`;
  }

  let result = Joi.validate(formData, createModelSchema, { abortEarly: false });
  if (!result.error) {
    return objectToReturn;
  }

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser,
    addModelDialog: state.addModelDialog,
    formData: state.form.addModelDialog,
    initialValues: {}
  };
};

const componentWithStyles = withStyles(styles)(AddModelDialog);

const formComponentWithStyles = reduxForm({
  form: "addModelDialog",
  validate: validate,
  enableReinitialize: true
})(componentWithStyles);

export default connect(mapStateToProps, {
  showAddModelDialog: showAddModelDialogActionCreator,
  hideAddModelDialog: hideAddModelDialogActionCreator,
  createModelAndUploadFiles: createModelAndUploadFilesWrapped
})(formComponentWithStyles);
