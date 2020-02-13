import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  showUserMenuActionCreator,
  hideUserMenuActionCreator
} from "../../../actions/userMenu";
import { logoutUserActionCreator } from "../../../actions/auth";
import { showChangePasswordDialogActionCreator } from "../../../actions/changePasswordDialog";
import { ExitToApp, Lock } from "@material-ui/icons";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

const styles = theme => ({
  root: {},
  menuDiv: {
    minWidth: 200
  }
});

class UserMenuComponent extends Component {
  handleMenuClose = () => {
    this.props.hideUserMenu();
  };

  handleLogoutClick = async () => {
    await this.props.hideUserMenu();
    await this.props.logoutUser();
  };

  handleChangePasswordClick = async () => {
    this.props.hideUserMenu();
    this.props.showChangePasswordDialog();
  };

  render() {
    let { userMenu, classes, referenceEl } = this.props;
    return (
      <Menu
        id="user-menu"
        className={classes.root}
        anchorEl={userMenu.visible ? referenceEl.current : null}
        keepMounted
        open={userMenu.visible}
        onClose={this.handleMenuClose}
      >
        <div className={classes.menuDiv}>
          <MenuItem onClick={this.handleChangePasswordClick}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Zmień hasło" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleLogoutClick}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Wyloguj się" />
          </MenuItem>
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userMenu: state.userMenu
  };
};

const componentWithStyles = withStyles(styles)(UserMenuComponent);

export default connect(mapStateToProps, {
  showUserMenu: showUserMenuActionCreator,
  hideUserMenu: hideUserMenuActionCreator,
  logoutUser: logoutUserActionCreator,
  showChangePasswordDialog: showChangePasswordDialogActionCreator
})(componentWithStyles);
