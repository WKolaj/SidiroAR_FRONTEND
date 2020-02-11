import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Toolbar, AppBar, IconButton, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import UserButtonComponent from "./UserButtonComponent";

const styles = theme => ({
  appBar: {},
  toolbar: {},
  menuButton: {},
  menuIcon: {},
  pageTitle: {
    flexGrow: 1
  }
});

class ToolbarComponent extends Component {
  renderPageTitle = url => {
    //To do later - return page title based on url
    return "SidorAR application";
  };

  render() {
    let { classes } = this.props;
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
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
  return {};
};

const componentWithStyles = withStyles(styles)(ToolbarComponent);

export default connect(mapStateToProps, {})(componentWithStyles);
