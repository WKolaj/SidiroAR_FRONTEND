import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Dialog, CircularProgress } from "@material-ui/core";
const styles = theme => {
  return {
    dialog: {},
    dialogDiv: {
      width: 200,
      height: 200
    },
    progress: {
      width: 200,
      height: 200,
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
          className={classes.dialog}
          open={busyDialogWindow.visible}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none"
            }
          }}
        >
          <div className={classes.dialogDiv}>
            <CircularProgress
              className={classes.progress}
              size={150}
              thickness={5}
              m="1"
            />
          </div>
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
