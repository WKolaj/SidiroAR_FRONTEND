import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DataTableComponent from "./DataTableComponent";

const styles = theme => ({});

class EditDataComponent extends Component {
  componentDidMount = async () => {};

  render() {
    return <DataTableComponent />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.data
  };
};

const componentWithStyles = withStyles(styles)(EditDataComponent);

export default connect(mapStateToProps, {})(componentWithStyles);
