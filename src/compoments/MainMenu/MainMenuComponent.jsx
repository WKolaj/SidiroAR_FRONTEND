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
import { ChevronLeft } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import {
  showMainMenuActionCreator,
  hideMainMenuActionCreator
} from "../../actions/mainMenu";

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
  }
});

class MainMenuComponent extends Component {
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
      </Drawer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    mainMenu: state.mainMenu
  };
};

const componentWithStyles = withStyles(styles)(MainMenuComponent);

export default connect(mapStateToProps, {
  showMainMenu: showMainMenuActionCreator,
  hideMainMenu: hideMainMenuActionCreator
})(componentWithStyles);
