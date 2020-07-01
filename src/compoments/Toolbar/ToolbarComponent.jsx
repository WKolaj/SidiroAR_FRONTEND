import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Toolbar, AppBar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import UserButtonComponent from "./UserButton/UserButtonComponent";
import {
  showMainMenuActionCreator,
  hideMainMenuActionCreator,
} from "../../actions/mainMenu";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { withTranslation } from "react-i18next";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    background: blueGrey[900],
  },
  menuButton: {
    marginRight: 24,
  },
  menuButtonHidden: {
    display: "none",
  },
  menuIcon: {},
  pageTitle: {
    flexGrow: 1,
  },
});

class ToolbarComponent extends Component {
  renderPageTitle = (url) => {
    let { t } = this.props;
    return t("toolbar.title");
  };

  handleMenuButtonClicked = async () => {
    if (this.props.mainMenu.visible) this.props.hideMainMenu();
    else this.props.showMainMenu();
  };

  render() {
    let { classes, mainMenu } = this.props;
    return (
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          mainMenu.visible && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={clsx(
              classes.menuButton,
              mainMenu.visible && classes.menuButtonHidden
            )}
            color="inherit"
            aria-label="menu"
            onClick={this.handleMenuButtonClicked}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.pageTitle}
          >
            {this.renderPageTitle()}
          </Typography>
          <UserButtonComponent />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    mainMenu: state.mainMenu,
  };
};

const componentWithStyles = withStyles(styles)(ToolbarComponent);

const componentWithTranslation = withTranslation()(componentWithStyles);

export default connect(mapStateToProps, {
  showMainMenu: showMainMenuActionCreator,
  hideMainMenu: hideMainMenuActionCreator,
})(componentWithTranslation);
