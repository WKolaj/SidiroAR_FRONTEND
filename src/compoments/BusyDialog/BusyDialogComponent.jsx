import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, CircularProgress, Grid } from "@material-ui/core";
import { zIndex } from "@material-ui/core/styles/zIndex";
const styles = theme => {
  return {
    dialog: {},
    circularProgress: {
      overflow: "visible",
      color: "#055f87"
    }
  };
};

class BusyDialog extends Component {
  render() {
    let { busyDialogWindow, classes } = this.props;
    return (
      <div>
        <Dialog
          open={busyDialogWindow.visible}
          className={classes.dialog}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflow: "visible"
            }
          }}
        >
          <CircularProgress
            className={classes.circularProgress}
            size={150}
            thickness={4}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    busyDialogWindow: state.busyDialogWindow
  };
};

const componentWithStyle = withStyles(styles)(BusyDialog);

export default connect(mapStateToProps, {})(componentWithStyle);
