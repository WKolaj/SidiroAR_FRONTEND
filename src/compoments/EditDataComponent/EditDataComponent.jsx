import React, { Component } from "react";
import { fetchAllUsersDataActionCreatorWrapped } from "../../actions/data";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { connect } from "react-redux";

const styles = theme => ({});

class EditDataComponent extends Component {
  componentDidMount = async () => {
    await this.props.fetchAllUsersData();
  };

  render() {
    let { classes, data } = this.props;

    return "test";
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.data
  };
};

const componentWithStyles = withStyles(styles)(EditDataComponent);

export default connect(mapStateToProps, {
  fetchAllUsersData: fetchAllUsersDataActionCreatorWrapped
})(componentWithStyles);
