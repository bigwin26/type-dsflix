import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import rootReducer, { rootSaga } from "./modules";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { languageCheck } from "modules/modal";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const setLanguage = () => {
  try {
    const language = localStorage.getItem("language");
    if (!language) localStorage.setItem("language", "ko");
    else {
      store.dispatch(languageCheck(language));
    }
  } catch (error) {
    console.log("localStorage is not working");
  }
};

setLanguage();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById("root"),
);
