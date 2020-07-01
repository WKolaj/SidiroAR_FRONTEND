import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  showUserMenuActionCreator,
  hideUserMenuActionCreator,
} from "../../../actions/userMenu";
import { logoutUserActionCreatorWrapped } from "../../../actions/auth";
import { showChangePasswordDialogActionCreator } from "../../../actions/changePasswordDialog";
import { ExitToApp, Lock } from "@material-ui/icons";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  menuRoot: {},
  menuDiv: {
    minWidth: 200,
    background: blueGrey[800],
  },
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
    let { userMenu, classes, referenceEl, t } = this.props;
    return (
      <Menu
        id="user-menu"
        className={classes.menuRoot}
        anchorEl={userMenu.visible ? referenceEl.current : null}
        keepMounted
        open={userMenu.visible}
        onClose={this.handleMenuClose}
        PaperProps={{
          style: {
            backgroundColor: blueGrey[800],
          },
        }}
      >
        <div className={classes.menuDiv}>
          <MenuItem onClick={this.handleChangePasswordClick}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <ListItemText primary={t("userButtonMenu.changePasswordText")} />
          </MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={t("userButtonMenu.logOutText")} />
          </MenuItem>
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userMenu: state.userMenu,
  };
};

const componentWithStyles = withStyles(styles)(UserMenuComponent);

const componentWithTranslations = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showUserMenu: showUserMenuActionCreator,
  hideUserMenu: hideUserMenuActionCreator,
  logoutUser: logoutUserActionCreatorWrapped,
  showChangePasswordDialog: showChangePasswordDialogActionCreator,
})(componentWithTranslations);
