import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  fileNotFoundTypography: {
    margin: theme.spacing(3)
  }
});

class FileNotFoundComponent extends Component {
  render() {
    return (
      <Typography
        className={this.props.classes.fileNotFoundTypography}
        variant="h4"
      >
        Strona nieznaleziona
      </Typography>
    );
  }
}

const componentWithStyles = withStyles(styles)(FileNotFoundComponent);

export default componentWithStyles;
