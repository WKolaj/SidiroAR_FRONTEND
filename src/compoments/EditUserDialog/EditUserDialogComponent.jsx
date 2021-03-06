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
} from "@material-ui/core";
import { Field, reduxForm, Form } from "redux-form";
import { userSchema } from "../../validation/validation";
import {
  showEditUserDialogActionCreator,
  hideEditUserDialogActionCreator,
} from "../../actions/editUserDialog";
import { putUserDataActionCreatorWrapped } from "../../actions/data";
import { exists, existsAndIsNotEmpty } from "../../utilities/utilities";
import { isAdmin, isSuperAdmin } from "../../utilities/userMethods";
import _ from "lodash";
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

class EditUserDialog extends Component {
  //Method for rendering single Field of form
  renderField = ({
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
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

  handleSubmit = async (e) => {
    let {
      formData,
      syncErrors,
      hideEditUserDialog,
      editUserDialog,
      putUserData,
      reset,
    } = this.props;
    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    let usersPayload = _.pick(
      formData.values,
      "name",
      "email",
      "permissions",
      "defaultLang"
    );

    //Appending password only if it exist - as optional
    if (existsAndIsNotEmpty(formData.values.password))
      usersPayload.password = formData.values.password;

    await putUserData(editUserDialog.userId, usersPayload);
    reset();
    await hideEditUserDialog();
  };

  handleCancelClicked = async () => {
    let { hideEditUserDialog, reset } = this.props;
    reset();
    await hideEditUserDialog();
  };

  checkUsersPermissions = (user) => {
    if (!existsAndIsNotEmpty(user)) return false;
    if (!exists(user.permissions)) return false;

    return isAdmin(user.permissions);
  };

  renderDefaultLangSelect = ({
    input,
    label,
    disabled,
    meta: { touched, error, warning },
  }) => {
    let { t } = this.props;

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
          <MenuItem value={"pl"}>{t("editUserDialog.langMenu.pl")}</MenuItem>
          <MenuItem value={"en"}>{t("editUserDialog.langMenu.en")}</MenuItem>
        </Select>
      </div>
    );
  };

  renderPermissionsSelect = ({
    input,
    label,
    disabled,
    meta: { touched, error, warning },
  }) => {
    let { currentUser, t } = this.props;

    let isUserSuperAdmin =
      currentUser &&
      currentUser.permissions &&
      isSuperAdmin(currentUser.permissions);

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
          <MenuItem value={1}>
            {t("editUserDialog.permissionsMenu.user")}
          </MenuItem>
          <MenuItem value={3} disabled={!isUserSuperAdmin}>
            {t("editUserDialog.permissionsMenu.admin")}
          </MenuItem>
          <MenuItem value={7} disabled={!isUserSuperAdmin}>
            {t("editUserDialog.permissionsMenu.superAdmin")}
          </MenuItem>
        </Select>
      </div>
    );
  };

  render() {
    let {
      currentUser,
      editUserDialog,
      classes,
      formData,
      hideEditUserDialog,
      handleSubmit,
      t,
    } = this.props;

    let usersPermissionsValid = this.checkUsersPermissions(currentUser);

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (editUserDialog.visible) hideEditUserDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={editUserDialog.visible}
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
              {t("editUserDialog.dialogTitle")}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Field
                name="email"
                type="text"
                component={this.renderField}
                label={t("editUserDialog.emailFieldLabel")}
                disabled
              />
              <Field
                name="name"
                type="text"
                component={this.renderField}
                label={t("editUserDialog.nameFieldLabel")}
              />
              <Field
                name="defaultLang"
                type="text"
                component={this.renderDefaultLangSelect}
                label={t("editUserDialog.defaultLangFieldLabel")}
              />
              <Field
                name="permissions"
                type="number"
                component={this.renderPermissionsSelect}
                label={t("editUserDialog.permissionsFieldLabel")}
              />
              <Field
                name="password"
                type="password"
                component={this.renderField}
                label={t("editUserDialog.newPasswordFieldLabel")}
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
                {t("editUserDialog.editButtonText")}
              </Button>
              <Button
                onClick={this.handleCancelClicked}
                color="primary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                {t("editUserDialog.cancelButtonText")}
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

  let result = userSchema.validate(formData, { abortEarly: false });
  if (!result.error) return objectToReturn;

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const mapStateToProps = (state, props) => {
  //Creating initial form values - if userId is given and user exists
  let userId = state.editUserDialog.userId;

  let initialUserPayload = {};

  if (existsAndIsNotEmpty(userId)) {
    let user = state.data.usersData[userId];
    if (existsAndIsNotEmpty(user)) {
      initialUserPayload.name = user.name;
      initialUserPayload.email = user.email;
      initialUserPayload.permissions = user.permissions;
      initialUserPayload.defaultLang = user.defaultLang;
    }
  }

  return {
    currentUser: state.auth.currentUser,
    editUserDialog: state.editUserDialog,
    formData: state.form.editUserDialog,
    data: state.data.usersData,
    initialValues: initialUserPayload,
  };
};

const componentWithStyles = withStyles(styles)(EditUserDialog);

const componentWithTrans = withTranslation()(componentWithStyles);

const formComponentWithStyles = reduxForm({
  form: "editUserDialog",
  validate: validate,
  enableReinitialize: true,
})(componentWithTrans);

export default connect(mapStateToProps, {
  showEditUserDialog: showEditUserDialogActionCreator,
  hideEditUserDialog: hideEditUserDialogActionCreator,
  putUserData: putUserDataActionCreatorWrapped,
})(formComponentWithStyles);
