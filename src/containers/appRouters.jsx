import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import Layout from "../components/layout";
// import Create from "../screens/Employee/create";
// import ViewEmployees from "../screens/Employee/viewEmployees";
// import Landing from "../screens/landingPage";
import Login from "../App"
import  HomePage  from "../screens/homePage";

const Routing = () => {
  return (
    <Switch>
      {/* <Route exact path={"/"} component={Login} /> */}
      <Route exact path={"/home"} component={HomePage}/>
    </Switch>
  );
};
export default Routing;
