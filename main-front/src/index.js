import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { AlertContextProvider } from "./contexts/AlertContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
