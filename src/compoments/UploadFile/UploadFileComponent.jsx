import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  fetchFileToSendActionCreator,
  uploadFileActionCreator
} from "../../actions/file";
import { exists } from "../../utilities/utilities";
import { Button } from "@material-ui/core";

const styles = theme => ({
  selectButton: {},
  uploadButton: {}
});

/**
 * @description Component for uploading file
 */
class UploadFileComponent extends Component {
  constructor(props) {
    super(props);

    //Refrerence to input of file type is needed - input of file type is an uncontrolled compoenent so we have to hide it in order to block users interaction
    this.fileInputRef = React.createRef();
  }

  //Method invoked on form submit - sending file to server
  handleFormSubmit = e => {
    e.preventDefault();

    let { uploadFile } = this.props;

    uploadFile();
  };

  //Method invoked when input of type file ends file selection
  handleFileSelectionChange = e => {
    let { fetchFileToSend, modelId, userId } = this.props;
    fetchFileToSend(userId, modelId, e.target.files[0]);
  };

  //Method invoked when select button is clicked - simulating uncontrolled component, by invoking its click method
  handleSelectButtonClicked = e => {
    this.fileInputRef.current.click();
  };

  render() {
    let {
      classes,
      userId,
      modelId,
      file,
      selectedUserId,
      selectedModelId
    } = this.props;

    //Checking if file exists and it is exactly the file for this component - selected userId and modelId matches component
    let fileLoaded =
      exists(file) && userId === selectedUserId && modelId === selectedModelId;

    //file input should be hidden - we cannot controll it
    //Instead there should a different input button which will fire item selection mechanism
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          ref={this.fileInputRef}
          style={{ display: "none" }}
          type="file"
          onChange={this.handleFileSelectionChange}
        />
        <Button
          className={classes.selectButton}
          onClick={this.handleSelectButtonClicked}
        >
          Select
        </Button>
        <Button
          className={classes.uploadButton}
          type="submit"
          disabled={!fileLoaded}
        >
          Upload
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    file: state.file.file,
    selectedUserId: state.file.userId,
    selectedModelId: state.file.modelId
  };
};

const componentWithStyles = withStyles(styles)(UploadFileComponent);

export default connect(mapStateToProps, {
  fetchFileToSend: fetchFileToSendActionCreator,
  uploadFile: uploadFileActionCreator
})(componentWithStyles);
