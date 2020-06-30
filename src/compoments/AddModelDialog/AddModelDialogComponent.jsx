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
  TextField,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Field, reduxForm, Form } from "redux-form";
import FieldFileInput from "../FieldFileInput/FieldFileInput";
import IOSFieldFileInput from "../FieldFileInput/IOSFieldFileInput";
import {
  createModelSchema,
  cloneModelSchema,
} from "../../validation/validation";
import {
  showAddModelDialogActionCreator,
  hideAddModelDialogActionCreator,
  createModelAndUploadFilesWrapped,
  switchToCloneModelDialogActionCreator,
  switchToNewModelDialogActionCreator,
} from "../../actions/addModelDialog";
import { maxFileSize } from "../../actions/file";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin } from "../../utilities/userMethods";
import _ from "lodash";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import { cloneModelActionCreatorWrapped } from "../../actions/data";

const styles = (theme) => {
  return {
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
    inputFileDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block",
    },
    inputFile: {},
    textField: {
      background: blueGrey[900],
    },
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block",
      background: blueGrey[900],
    },
    errorLabel: {
      color: red[900],
      display: "block",
    },
    selectField: {},
    selectFieldDiv: {
      "margin-top": theme.spacing(1),
      "margin-bottom": theme.spacing(1),
      display: "block",
    },
  };
};

class AddModelDialog extends Component {
  renderUserSelect = ({
    input,
    label,
    disabled,
    meta: { touched, error, warning },
  }) => {
    let allUsersExceptCurrentUser = Object.values(this.props.usersData).filter(
      (user) => user._id !== this.props.addModelDialog.userId
    );

    return (
      <div className={this.props.classes.selectFieldDiv}>
        <InputLabel className={this.props.classes.inputLabel} shrink>
          {label}
        </InputLabel>
        <Select
          className={this.props.classes.selectField}
          {...input}
          placeholder={label}
          label={label}
          disabled={disabled}
          fullWidth
        >
          {allUsersExceptCurrentUser.map((user) => {
            return (
              <MenuItem key={user._id} value={user._id}>
                {user.email}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    );
  };

  renderModelSelect = ({
    input,
    label,
    disabled,
    meta: { touched, error, warning },
    userToClone,
  }) => {
    let selectDisable = true;
    let modelsOfUser = [];

    if (exists(userToClone)) {
      selectDisable = false;
      modelsOfUser = Object.values(this.props.usersData[userToClone].models);
    }

    return (
      <div className={this.props.classes.selectFieldDiv}>
        <InputLabel className={this.props.classes.inputLabel} shrink>
          {label}
        </InputLabel>
        <Select
          className={this.props.classes.selectField}
          {...input}
          placeholder={label}
          label={label}
          disabled={selectDisable}
          fullWidth
        >
          {modelsOfUser.map((model) => {
            return (
              <MenuItem key={model._id} value={model._id}>
                {model.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    );
  };

  renderSwitchToCloneRadioGroup = () => {
    let { addModelDialog } = this.props;
    return (
      <RadioGroup
        value={addModelDialog.newModel ? "newModel" : "cloneModel"}
        onChange={this.handleSwitchToCloneRadioGroupChange}
      >
        <FormControlLabel
          value="newModel"
          control={<Radio />}
          label="Stwórz nowy model"
        />
        <FormControlLabel
          value="cloneModel"
          control={<Radio />}
          label="Kopiuj istniejący model"
        />
      </RadioGroup>
    );
  };

  renderNewModelFields = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  renderCloneModelFields = () => {
    return (
      <React.Fragment>
        <Field
          name="userToClone"
          type="text"
          component={this.renderUserSelect}
          label="Użytkownik"
        />
        <Field
          name="modelToClone"
          type="text"
          component={this.renderModelSelect}
          userToClone={this.props.formData.values.userToClone}
          label="Model"
        />
      </React.Fragment>
    );
  };

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
        <IOSFieldFileInput
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

  handleSwitchToCloneRadioGroupChange = async (event) => {
    if (event.target.value === "newModel") {
      this.props.switchToNewModel();
    } else if (event.target.value === "cloneModel") {
      this.props.switchToCloneModel();
    }

    this.props.reset();
  };

  handleSubmit = async (e) => {
    let {
      formData,
      syncErrors,
      addModelDialog,
      createModelAndUploadFiles,
      cloneModel,
      hideAddModelDialog,
      reset,
    } = this.props;

    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    if (addModelDialog.newModel) {
      //Adding new model

      let modelPayload = _.pick(formData.values, "name");
      let { userId } = addModelDialog;

      await createModelAndUploadFiles(
        userId,
        modelPayload,
        formData.values.file,
        formData.values.iosFile
      );
    } else {
      //Coping existing one
      let { userId } = addModelDialog;
      let { modelToClone } = formData.values;

      await cloneModel(userId, modelToClone);
    }

    reset();
    await hideAddModelDialog();
  };

  handleCancelClicked = async () => {
    let { hideAddModelDialog, reset } = this.props;
    reset();
    await hideAddModelDialog();
  };

  checkUsersPermissions = (user) => {
    if (!existsAndIsNotEmpty(user)) return false;
    if (!exists(user.permissions)) return false;

    return isAdmin(user.permissions);
  };

  creationDisabled = () => {
    let { formData } = this.props;
    return (
      !exists(formData) ||
      (exists(formData) &&
        (exists(formData.syncErrors) || !formData.anyTouched))
    );
  };

  render() {
    let {
      currentUser,
      addModelDialog,
      classes,
      hideAddModelDialog,
      handleSubmit,
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
              background: blueGrey[900],
            },
          }}
        >
          <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <DialogTitle className={classes.dialogTitle}>
              Utwórz nowy model
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              {this.renderSwitchToCloneRadioGroup()}
              {addModelDialog.newModel
                ? this.renderNewModelFields()
                : this.renderCloneModelFields()}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                disabled={this.creationDisabled()}
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

  let validationSchema = null;
  let formDataToCheck = null;

  if (props.addModelDialog.newModel) {
    if (exists(formData.file)) {
      //Checking if max file size exceeds
      if (formData.file.size >= maxFileSize)
        objectToReturn.file = `File cannot exceed ${(
          maxFileSize /
          1024 /
          1024
        ).toFixed(2)} MB`;
    }

    formDataToCheck = _.pick(formData, ["name", "file", "iosFile"]);
    validationSchema = createModelSchema;
  } else {
    formDataToCheck = _.pick(formData, ["userToClone", "modelToClone"]);
    validationSchema = cloneModelSchema;
  }

  let result = validationSchema.validate(formDataToCheck, {
    abortEarly: false,
  });

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
    usersData: state.data.usersData,
    initialValues: {},
  };
};

const componentWithStyles = withStyles(styles)(AddModelDialog);

const formComponentWithStyles = reduxForm({
  form: "addModelDialog",
  validate: validate,
  enableReinitialize: true,
})(componentWithStyles);

export default connect(mapStateToProps, {
  showAddModelDialog: showAddModelDialogActionCreator,
  hideAddModelDialog: hideAddModelDialogActionCreator,
  createModelAndUploadFiles: createModelAndUploadFilesWrapped,
  switchToCloneModel: switchToCloneModelDialogActionCreator,
  switchToNewModel: switchToNewModelDialogActionCreator,
  cloneModel: cloneModelActionCreatorWrapped,
})(formComponentWithStyles);
