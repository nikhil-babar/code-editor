import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/utils/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loader />}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
