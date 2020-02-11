import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./compoments/MainComponent";
import { SnackbarProvider } from "notistack";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
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
