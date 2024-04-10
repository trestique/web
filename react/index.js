import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store';

import App from "./App";
import AppContainer from './AppContainer';
//import  "../scss/app.scss";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </AppContainer>
    </BrowserRouter>
  </Provider>,
  document.getElementById("trestique-react-root")
);
