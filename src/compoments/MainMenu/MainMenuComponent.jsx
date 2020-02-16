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
  IconButton
} from "@material-ui/core";
import { Person, People } from "@material-ui/icons";
import { ChevronLeft } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { getBit, existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import {
  showMainMenuActionCreator,
  hideMainMenuActionCreator
} from "../../actions/mainMenu";
import { Link } from "react-router-dom";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  menuList: {
    "padding-left": 8
  },
  menuItemLink: {
    textDecoration: "none",
    color: "inherit"
  },
  menuItem: {}
});

class MainMenuComponent extends Component {
  checkMenuItemDisabled = permissionsBit => {
    let { currentUser } = this.props;

    if (!existsAndIsNotEmpty(currentUser)) return false;

    if (!exists(currentUser.permissions)) return false;

    return !getBit(currentUser.permissions, permissionsBit);
  };

  render() {
    let { mainMenu, classes, hideMainMenu } = this.props;

    return (
      <Drawer
        open={mainMenu.visible}
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !mainMenu.visible && classes.drawerPaperClose
          )
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={hideMainMenu}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.menuList}>
          <Link
            className={classes.menuItemLink}
            to="/me"
            onClick={e => {
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
              <ListItemText primary="Moje modele" />
            </ListItem>
          </Link>
          <Link
            className={classes.menuItemLink}
            to="/users"
            onClick={e => {
              return this.checkMenuItemDisabled(1) ? e.preventDefault() : e;
            }}
          >
            <ListItem button disabled={this.checkMenuItemDisabled(1)}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Inni użytkownicy" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    mainMenu: state.mainMenu,
    currentUser: state.auth.currentUser
  };
};

const componentWithStyles = withStyles(styles)(MainMenuComponent);

export default connect(mapStateToProps, {
  showMainMenu: showMainMenuActionCreator,
  hideMainMenu: hideMainMenuActionCreator
})(componentWithStyles);
