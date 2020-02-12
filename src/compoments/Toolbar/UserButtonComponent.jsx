import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { logoutUserActionCreator } from "../../actions/auth";
import { showLoginDialogActionCreator } from "../../actions/loginDialog";
import {} from "@material-ui/icons";

const styles = theme => ({
  logInButton: {},
  logOutButton: {}
});

class UserButtonComponent extends Component {
  renderLogInButton = () => {
    let { classes, showLoginDialog } = this.props;
    return (
      <Button
        color="inherit"
        className={classes.logInButton}
        onClick={showLoginDialog}
      >
        Log in
      </Button>
    );
  };

  renderLogOutButton = () => {
    let { classes, logoutUser } = this.props;
    return (
      <Button
        color="inherit"
        className={classes.logOutButton}
        onClick={logoutUser}
      >
        Log out
      </Button>
    );
  };

  render() {
    let { classes, currentUser } = this.props;
    return currentUser ? this.renderLogOutButton() : this.renderLogInButton();
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser
  };
};

const componentWithStyles = withStyles(styles)(UserButtonComponent);

export default connect(mapStateToProps, {
  logoutUser: logoutUserActionCreator,
  showLoginDialog: showLoginDialogActionCreator
})(componentWithStyles);
