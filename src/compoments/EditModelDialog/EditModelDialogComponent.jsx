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
import { editModelSchema } from "../../validation/validation";
import Joi from "joi-browser";
import {
  showEditModelDialogActionCreator,
  hideEditModelDialogActionCreator
} from "../../actions/editModelDialog";
import { putModelDataActionCreatorWrapped } from "../../actions/data";
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
    textField: {},
    textFieldDiv: {
      "margin-bottom": theme.spacing(2),
      display: "block"
    },
    errorLabel: {
      color: red[900],
      display: "block"
    },
    selectField: {},
    selectFieldDiv: {
      "margin-bottom": theme.spacing(1),
      display: "block"
    }
  };
};

class EditModelDialog extends Component {
  //Method for rendering single Field of form
  renderField = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning }
  }) => (
    <div className={this.props.classes.textFieldDiv}>
      <TextField
        className={this.props.classes.textField}
        {...input}
        label={label}
        placeholder={label}
        type={type}
        fullWidth
        disabled={disabled}
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

  handleSubmit = async e => {
    let {
      formData,
      syncErrors,
      hideEditModelDialog,
      editModelDialog,
      putModelDataAction,
      reset
    } = this.props;
    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    let modelPayload = _.pick(formData.values, "name");

    await putModelDataAction(
      editModelDialog.userId,
      editModelDialog.modelId,
      modelPayload
    );
    reset();
    await hideEditModelDialog();
  };

  handleCancelClicked = async () => {
    let { hideEditModelDialog, reset } = this.props;
    reset();
    await hideEditModelDialog();
  };

  checkUsersPermissions = user => {
    if (!existsAndIsNotEmpty(user)) return false;
    if (!exists(user.permissions)) return false;

    return isAdmin(user.permissions);
  };

  render() {
    let {
      currentUser,
      editModelDialog,
      classes,
      formData,
      hideEditModelDialog,
      handleSubmit
    } = this.props;

    let usersPermissionsValid = this.checkUsersPermissions(currentUser);

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (editModelDialog.visible) hideEditModelDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={editModelDialog.visible}
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
              Edytuj model
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Field
                name="name"
                type="text"
                component={this.renderField}
                label="Nazwa"
              />
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                disabled={
                  !exists(formData) ||
                  (exists(formData) && exists(formData.syncErrors))
                }
                color="secondary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                Edytuj
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

  let result = Joi.validate(formData, editModelSchema, { abortEarly: false });
  if (!result.error) return objectToReturn;

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const mapStateToProps = (state, props) => {
  //Creating initial form values - if userId and modelId are given and model exists
  let userId = state.editModelDialog.userId;
  let modelId = state.editModelDialog.modelId;

  let initialUserPayload = {};

  if (existsAndIsNotEmpty(userId) && existsAndIsNotEmpty(modelId)) {
    let user = state.data.usersData[userId];
    if (existsAndIsNotEmpty(user)) {
      let model = user.models[modelId];
      if (existsAndIsNotEmpty(model)) {
        initialUserPayload.name = model.name;
      }
    }
  }

  return {
    currentUser: state.auth.currentUser,
    editModelDialog: state.editModelDialog,
    formData: state.form.editModelDialog,
    data: state.data.usersData,
    initialValues: initialUserPayload
  };
};

const componentWithStyles = withStyles(styles)(EditModelDialog);

const formComponentWithStyles = reduxForm({
  form: "editModelDialog",
  validate: validate,
  enableReinitialize: true
})(componentWithStyles);

export default connect(mapStateToProps, {
  showEditModelDialog: showEditModelDialogActionCreator,
  hideEditModelDialog: hideEditModelDialogActionCreator,
  putModelDataAction: putModelDataActionCreatorWrapped
})(formComponentWithStyles);
