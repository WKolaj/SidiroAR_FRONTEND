import React, { Component } from "react";
import { Button, Typography, InputLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { exists } from "../../utilities/utilities";

const styles = (theme) => ({
  fileLoadButton: {
    margin: theme.spacing(1),
  },
  fileLabel: {
    margin: theme.spacing(1),
    display: "inline",
  },
  titleLabel: {},
});

class IOSFieldFileInput extends Component {
  constructor(props) {
    super(props);

    //Refrerence to input of file type is needed - input of file type is an uncontrolled compoenent so we have to hide it in order to block users interaction
    this.fileInputRef = React.createRef();
  }

  //Method invoked when select button is clicked - simulating uncontrolled component, by invoking its click method
  handleSelectButtonClicked = (e) => {
    this.fileInputRef.current.click();
  };

  //Method invoked when input of type file ends file selection
  handleFileSelectionChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.files[0]);
  };

  renderInputLabel = () => {
    const { label, classes } = this.props;
    return (
      <InputLabel className={classes.titleLabel} shrink>
        {label}
      </InputLabel>
    );
  };

  renderLoadFileButton = () => {
    return (
      <Button
        className={this.props.classes.fileLoadButton}
        variant="contained"
        color="primary"
        onClick={this.handleSelectButtonClicked}
      >
        Wczytaj
      </Button>
    );
  };

  renderFileNameLabel = () => {
    const { value, classes } = this.props;
    return (
      <Typography className={classes.fileLabel}>
        {exists(value.name) ? value.name : "Brak pliku"}
      </Typography>
    );
  };

  render() {
    return (
      <div>
        {this.renderInputLabel()}
        <input
          ref={this.fileInputRef}
          style={{ display: "none" }}
          type="file"
          accept=".ismdl"
          onChange={this.handleFileSelectionChange}
        />
        <span>
          {this.renderLoadFileButton()}
          {this.renderFileNameLabel()}
        </span>
      </div>
    );
  }
}

const componentWithStyles = withStyles(styles)(IOSFieldFileInput);

export default componentWithStyles;
