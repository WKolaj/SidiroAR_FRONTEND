import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./compoments/MainComponent";
import { SnackbarProvider } from "notistack";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: {
      main: red[900],
      light: red[600]
    },
    type: "dark",
    background: {
      default: blueGrey[800]
    }
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={1}>
              <MainComponent />
            </SnackbarProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
