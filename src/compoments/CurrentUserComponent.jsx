import React, { Component } from "react";
import {
  loginUserActionCreator,
  loginUserWithJWTActionCreator,
  logoutUserActionCreator
} from "../actions/auth";
import {
  fetchCurrentUserDataActionCreator,
  fetchAllUsersDataActionCreator,
  fetchUserDataActionCreator,
  fetchModelDataActionCreator,
  fetchModelsDataActionCreator
} from "../actions/data";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const styles = theme => ({});

class CurrentUserComponenent extends Component {
  componentDidMount = async () => {};
  render() {
    console.log(this.props.currentUser);
    console.log(this.props.currentUserData);
    console.log(this.props.allUsers);
    let {
      loginUser,
      logoutUser,
      fetchCurrentUserData,
      fetchAllUsersData,
      fetchUserData,
      fetchModelData,
      fetchModelsData
    } = this.props;
    return (
      <React.Fragment>
        <Button
          onClick={() =>
            loginUser(
              "witold.kolaj@siemens.com",
              process.env.REACT_APP_SUPER_ADMIN_PASSWORD
            )
          }
        >
          Log in
        </Button>
        <Button onClick={() => logoutUser()}>Log out</Button>
        <Button onClick={() => fetchCurrentUserData()}>Get user data</Button>
        <Button onClick={() => fetchAllUsersData()}>Get users data</Button>
        <Button onClick={() => fetchUserData("5e402e60d4f3091c08b6df42")}>
          Get user1 data
        </Button>
        <Button onClick={() => fetchUserData("5e405715f7a175266311b70d")}>
          Get user2 data
        </Button>
        <Button onClick={() => fetchModelsData("5e402e60d4f3091c08b6df42")}>
          Fetch models of user 1
        </Button>
        <Button onClick={() => fetchModelsData("5e405715f7a175266311b70d")}>
          Fetch models of user 2
        </Button>
        <Button
          onClick={() =>
            fetchModelData(
              "5e402e60d4f3091c08b6df42",
              "5e405407f7a175266311b70a"
            )
          }
        >
          Fetch model 1 of user 1
        </Button>
        <Button
          onClick={() =>
            fetchModelData(
              "5e402e60d4f3091c08b6df42",
              "5e40540cf7a175266311b70c"
            )
          }
        >
          Fetch model 2 of user 1
        </Button>
        <Button
          onClick={() =>
            fetchModelData(
              "5e402e60d4f3091c08b6df42",
              "5e405e72f7a175266311b70f"
            )
          }
        >
          Fetch model 3 of user 1
        </Button>
        <Button
          onClick={() =>
            fetchModelData(
              "5e405715f7a175266311b70d",
              "5e405eb4f7a175266311b710"
            )
          }
        >
          Fetch model 1 of user 2
        </Button>
        <Button
          onClick={() =>
            fetchModelData(
              "5e405715f7a175266311b70d",
              "5e405eb4f7a175266311b711"
            )
          }
        >
          Fetch model 2 of user 2
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentUser: state.auth.currentUser,
    currentUserData: state.data.currentUserData,
    allUsers: state.data.usersData
  };
};

const componentWithStyles = withStyles(styles)(CurrentUserComponenent);

export default connect(mapStateToProps, {
  loginUser: loginUserActionCreator,
  loginUserWithJWT: loginUserWithJWTActionCreator,
  logoutUser: logoutUserActionCreator,
  fetchCurrentUserData: fetchCurrentUserDataActionCreator,
  fetchAllUsersData: fetchAllUsersDataActionCreator,
  fetchUserData: fetchUserDataActionCreator,
  fetchModelData: fetchModelDataActionCreator,
  fetchModelsData: fetchModelsDataActionCreator
})(componentWithStyles);
