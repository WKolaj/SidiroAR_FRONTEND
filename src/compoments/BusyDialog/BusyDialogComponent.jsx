import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, CircularProgress } from "@material-ui/core";
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
    let { busyDialog, classes } = this.props;
    return (
      <div>
        <Dialog
          open={busyDialog.visible}
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
    busyDialog: state.busyDialog
  };
};

const componentWithStyle = withStyles(styles)(BusyDialog);

export default connect(mapStateToProps, {})(componentWithStyle);
