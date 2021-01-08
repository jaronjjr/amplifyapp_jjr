import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Layout from "../components/layout";
import Login from "../App";
import HomePage from "../screens/homePage";
import ProductList from "../screens/productList";
const Routing = () => {
  return (
    <Switch>
      <Layout> 
        <Switch>
      <Route exact path={"/"} component={Login} />
        <Route exact path="/list" component={ProductList} />
        <Route exact path="/details" component={HomePage} />
        <Route exact path="/details/edit/:id/" component={HomePage} />
        </Switch>
      </Layout>
    </Switch>
  );
};
export default Routing;