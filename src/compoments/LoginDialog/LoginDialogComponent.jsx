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
} from "@material-ui/core";
import { Field, reduxForm, Form } from "redux-form";
import { authSchema } from "../../validation/validation";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator,
} from "../../actions/loginDialog";
import { loginUserActionCreatorWrapped } from "../../actions/auth";
import { exists } from "../../utilities/utilities";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";

const styles = (theme) => {
  return {
    rootDiv: {},
    dialog: {},
    dialogTitle: {},
    dialogContent: {},
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
    let { loginUser, formData, syncErrors, hideLoginDialog } = this.props;
    //Preventing loggining in with invalid data - validation error exists if there is something wrong
    if (exists(syncErrors)) return;

    let { email, password } = formData.values;

    await loginUser(email, password);
    await hideLoginDialog();
  };

  handleCancelClicked = async () => {
    let { hideLoginDialog } = this.props;
    await hideLoginDialog();
  };

  render() {
    let { loginDialog, classes, formData, handleSubmit } = this.props;
    return (
      <div className={classes.rootDiv}>
        <Dialog
          open={loginDialog.visible}
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
              {" "}
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
                Zaloguj się
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

const validate = (formData) => {
  let result = authSchema.validate(formData, { abortEarly: false });
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
    formData: state.form.loginDialog,
  };
};

const componentWithStyles = withStyles(styles)(LoginDialog);

const formComponentWithStyles = reduxForm({
  form: "loginDialog",
  validate: validate,
})(componentWithStyles);

export default connect(mapStateToProps, {
  loginUser: loginUserActionCreatorWrapped,
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator,
})(formComponentWithStyles);
