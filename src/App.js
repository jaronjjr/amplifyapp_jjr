import React from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import  ProductList  from './screens/productList';
import { push } from "connected-react-router";
import { connect } from "react-redux";

 
function Login() {
  return (
    <div className="App">
      <ProductList/>
    </div>
  );
}


export default withAuthenticator(Login);


