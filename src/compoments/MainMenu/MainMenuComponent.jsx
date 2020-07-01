import React, { Component } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Person, People, Language } from "@material-ui/icons";
import { ChevronLeft } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { getBit, existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import {
  showMainMenuActionCreator,
  hideMainMenuActionCreator,
} from "../../actions/mainMenu";
import { showChangeLanguageDialogActionCreator } from "../../actions/changeLanguageDialog";
import { Link } from "react-router-dom";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";
import logo from "../../images/siemens_logo_white.png";

const styles = (theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    background: blueGrey[900],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuList: {
    "padding-left": 8,
  },
  menuItemLink: {
    textDecoration: "none",
    color: "inherit",
  },
  menuItem: {},
  logo: {
    height: 50,
    "margin-left": 10,
    "margin-right": 10,
  },
});

class MainMenuComponent extends Component {
  checkMenuItemDisabled = (permissionsBit) => {
    let { currentUser } = this.props;

    if (!existsAndIsNotEmpty(currentUser)) return false;

    if (!exists(currentUser.permissions)) return false;

    return !getBit(currentUser.permissions, permissionsBit);
  };

  render() {
    let { mainMenu, classes, hideMainMenu, showLanguageDialog, t } = this.props;

    return (
      <Drawer
        open={mainMenu.visible}
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !mainMenu.visible && classes.drawerPaperClose
          ),
        }}
      >
        <div className={classes.toolbarIcon}>
          <img className={classes.logo} src={logo} alt="Siemens" />
          <IconButton onClick={hideMainMenu}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.menuList}>
          <Link
            className={classes.menuItemLink}
            to="/sidiroar/me"
            onClick={(e) => {
              return this.checkMenuItemDisabled(0) ? e.preventDefault() : e;
            }}
          >
            <ListItem
              className={classes.menuItem}
              button
              disabled={this.checkMenuItemDisabled(0)}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={t("mainMenu.myModelsText")} />
            </ListItem>
          </Link>
          <Link
            className={classes.menuItemLink}
            to="/sidiroar/users"
            onClick={(e) => {
              return this.checkMenuItemDisabled(1) ? e.preventDefault() : e;
            }}
          >
            <ListItem button disabled={this.checkMenuItemDisabled(1)}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={t("mainMenu.usersText")} />
            </ListItem>
          </Link>
          <ListItem button onClick={showLanguageDialog}>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText primary={t("mainMenu.languageText")} />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    mainMenu: state.mainMenu,
    currentUser: state.auth.currentUser,
  };
};

const componentWithStyles = withStyles(styles)(MainMenuComponent);

const componentWithTranslations = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showMainMenu: showMainMenuActionCreator,
  hideMainMenu: hideMainMenuActionCreator,
  showLanguageDialog: showChangeLanguageDialogActionCreator,
})(componentWithTranslations);
