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
import { Field, reduxForm } from "redux-form";
import { authSchema } from "../../validation/validation";
import Joi from "joi-browser";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator
} from "../../actions/loginDialog";
import { loginUserActionCreatorWrapped } from "../../actions/auth";
import { exists } from "../../utilities/utilities";

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
      color: "red",
      display: "block"
    }
  };
};

class LoginDialog extends Component {
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
      />
      {touched &&
        ((error && (
          <FormHelperText
            className={this.props.classes.errorLabel}
            variant="caption"
          >
            {error}
          </FormHelperText>
        )) ||
          (warning && (
            <FormHelperText
              className={this.props.classes.errorLabel}
              variant="caption"
            >
              {warning}
            </FormHelperText>
          )))}
    </div>
  );

  handleLoginClicked = async () => {
    let { loginUser, formData, syncErrors } = this.props;
    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    let { email, password } = formData.values;

    await loginUser(email, password);
  };

  render() {
    let { loginDialog, classes, formData } = this.props;
    return (
      <div>
        <Dialog
          open={loginDialog.visible}
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
            Podaj email i hasło użytkownika
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Field
              name="email"
              type="text"
              component={this.renderField}
              label="Email"
            />
            <Field
              name="password"
              type="password"
              component={this.renderField}
              label="Hasło"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleLoginClicked}
              disabled={
                !exists(formData) ||
                (exists(formData) &&
                  (exists(formData.syncErrors) || !formData.anyTouched))
              }
              color="primary"
            >
              Zaloguj się
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const validate = formData => {
  let result = Joi.validate(formData, authSchema, { abortEarly: false });
  if (!result.error) return {};

  let objectToReturn = {};

  for (let detail of result.error.details) {
    objectToReturn[detail.path] = detail.message;
  }

  return objectToReturn;
};

const mapStateToProps = (state, props) => {
  return {
    loginDialog: state.loginDialog,
    formData: state.form.loginDialog
  };
};

const componentWithStyles = withStyles(styles)(LoginDialog);

const formComponentWithStyles = reduxForm({
  form: "loginDialog",
  validate: validate
})(componentWithStyles);

export default connect(mapStateToProps, {
  loginUser: loginUserActionCreatorWrapped,
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator
})(formComponentWithStyles);
