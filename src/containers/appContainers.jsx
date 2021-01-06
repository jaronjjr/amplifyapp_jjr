import React from "react";
import Routing from "./appRouters";
import { Provider } from "react-redux";
import store, { history } from "../store/configureStore";

import { Router } from "react-router";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routing />
      </Router>
    </Provider>
  );
};

export default App;
