import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { existsAndIsNotEmpty } from "../../utilities/utilities";
import { connect } from "react-redux";
import DataTableComponent from "./DataTableComponent";

const styles = theme => ({});

class EditDataComponent extends Component {
  componentDidMount = async () => {};

  render() {
    let { classes, data } = this.props;

    return <DataTableComponent></DataTableComponent>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: state.data
  };
};

const componentWithStyles = withStyles(styles)(EditDataComponent);

export default connect(mapStateToProps, {})(componentWithStyles);
