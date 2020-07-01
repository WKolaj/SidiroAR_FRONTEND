import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { showUserMenuActionCreator } from "../../../actions/userMenu";
import { showLoginDialogActionCreator } from "../../../actions/loginDialog";
import { existsAndIsNotEmpty } from "../../../utilities/utilities";
import { Person } from "@material-ui/icons";
import UserMenuComponent from "./UserMenuComponent";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  button: {},
  buttonIcon: {},
});

class UserButtonComponent extends Component {
  constructor(props) {
    super(props);
    this.ownRef = React.createRef();
  }

  handleButtonClicked = () => {
    let { currentUser, showUserMenu, showLoginDialog } = this.props;

    //Button associated with current user
    if (existsAndIsNotEmpty(currentUser)) showUserMenu();
    //Button associated with logging in
    else showLoginDialog();
  };

  render() {
    let { classes, currentUser, t } = this.props;
    return (
      <React.Fragment>
        <Button
          className={classes.button}
          variant="contained"
          startIcon={<Person className={classes.buttonIcon} />}
          color="primary"
          onClick={this.handleButtonClicked}
          ref={this.ownRef}
        >
          {existsAndIsNotEmpty(currentUser)
            ? currentUser.name
            : t("userButton.text")}
        </Button>
        <UserMenuComponent referenceEl={this.ownRef} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const componentWithStyles = withStyles(styles)(UserButtonComponent);

const componentWithTranslation = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showUserMenu: showUserMenuActionCreator,
  showLoginDialog: showLoginDialogActionCreator,
})(componentWithTranslation);
