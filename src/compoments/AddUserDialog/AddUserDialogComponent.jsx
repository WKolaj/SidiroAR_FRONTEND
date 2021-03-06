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
  showAddUserDialogActionCreator,
  hideAddUserDialogActionCreator,
} from "../../actions/addUserDialog";
import { postUserDataActionCreatorWrapped } from "../../actions/data";
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

class AddUserDialog extends Component {
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

  handleSubmit = async (e) => {
    let {
      formData,
      syncErrors,
      hideAddUserDialog,
      postUserData,
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

    await postUserData(usersPayload);
    reset();
    await hideAddUserDialog();
  };

  handleCancelClicked = async () => {
    let { hideAddUserDialog, reset } = this.props;
    reset();
    await hideAddUserDialog();
  };

  checkUsersPermissions = (user) => {
    if (!existsAndIsNotEmpty(user)) return false;
    if (!exists(user.permissions)) return false;

    return isAdmin(user.permissions);
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
            {t("addUserDialog.permissionsMenu.user")}
          </MenuItem>
          <MenuItem value={3} disabled={!isUserSuperAdmin}>
            {t("addUserDialog.permissionsMenu.admin")}
          </MenuItem>
          <MenuItem value={7} disabled={!isUserSuperAdmin}>
            {t("addUserDialog.permissionsMenu.superAdmin")}
          </MenuItem>
        </Select>
      </div>
    );
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
          <MenuItem value={"pl"}>{t("addUserDialog.langMenu.pl")}</MenuItem>
          <MenuItem value={"en"}>{t("addUserDialog.langMenu.en")}</MenuItem>
        </Select>
      </div>
    );
  };

  render() {
    let {
      currentUser,
      addUserDialog,
      classes,
      formData,
      hideAddUserDialog,
      handleSubmit,
      t,
    } = this.props;

    let usersPermissionsValid = this.checkUsersPermissions(currentUser);

    //In case users permissions are not valid - hide user dialog if it is visible
    if (!usersPermissionsValid) {
      if (addUserDialog.visible) hideAddUserDialog();

      return null;
    }

    return (
      <div>
        <Dialog
          open={addUserDialog.visible}
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
              {t("addUserDialog.dialogTitle")}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Field
                name="email"
                type="text"
                component={this.renderField}
                label={t("addUserDialog.emailFieldLabel")}
              />
              <Field
                name="name"
                type="text"
                component={this.renderField}
                label={t("addUserDialog.nameFieldLabel")}
              />
              <Field
                name="defaultLang"
                type="text"
                component={this.renderDefaultLangSelect}
                label={t("addUserDialog.defaultLangFieldLabel")}
              />
              <Field
                name="permissions"
                type="number"
                component={this.renderPermissionsSelect}
                label={t("addUserDialog.permissionsFieldLabel")}
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
                {t("addUserDialog.createButtonText")}
              </Button>
              <Button
                onClick={this.handleCancelClicked}
                color="primary"
                variant="contained"
                style={{ minWidth: 125 }}
              >
                {t("addUserDialog.cancelButtonText")}
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
  if (!result.error) {
    //Checking if user of given email already exists
    let allUserEmails = Object.values(props.data).map((user) => user.email);
    if (allUserEmails.find((email) => email === formData.email))
      objectToReturn.email = "User of given email already exists...";

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
    addUserDialog: state.addUserDialog,
    formData: state.form.addUserDialog,
    data: state.data.usersData,
    initialValues: { permissions: 1, defaultLang: "pl" },
  };
};

const componentWithStyles = withStyles(styles)(AddUserDialog);

const componentWithTrans = withTranslation()(componentWithStyles);

const formComponentWithStyles = reduxForm({
  form: "addUserDialog",
  validate: validate,
  enableReinitialize: true,
})(componentWithTrans);

export default connect(mapStateToProps, {
  showAddUserDialog: showAddUserDialogActionCreator,
  hideAddUserDialog: hideAddUserDialogActionCreator,
  postUserData: postUserDataActionCreatorWrapped,
})(formComponentWithStyles);
