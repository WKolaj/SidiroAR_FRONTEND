import { Component } from "react";
import { loginUserWithJWTActionCreator } from "../../actions/auth";
import {
  showLoginDialogActionCreator,
  hideLoginDialogActionCreator
} from "../../actions/loginDialog";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { existsAndIsNotEmpty, exists } from "../../utilities/utilities";
import { getCurrentJWT } from "../../services/authService";

const styles = theme => ({});

class ForceUserLoginComponent extends Component {
  componentDidMount = async () => {
    let jwt = getCurrentJWT();
    if (existsAndIsNotEmpty(jwt)) this.props.loginUserWithJWT(jwt);
    else this.props.showLoginDialog();
  };

  refreshLoginDialogVisibility = async () => {
    let {
      currentUser,
      loginDialog,
      hideLoginDialog,
      showLoginDialog
    } = this.props;
    if (exists(currentUser) && loginDialog.visible) await hideLoginDialog();
    if (!exists(currentUser) && !loginDialog.visible) await showLoginDialog();
  };

  componentDidUpdate = async () => {
    this.refreshLoginDialogVisibility();
  };

  render() {
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser,
    loginDialog: state.loginDialog
  };
};

const componentWithStyles = withStyles(styles)(ForceUserLoginComponent);

export default connect(mapStateToProps, {
  loginUserWithJWT: loginUserWithJWTActionCreator,
  showLoginDialog: showLoginDialogActionCreator,
  hideLoginDialog: hideLoginDialogActionCreator
})(componentWithStyles);
