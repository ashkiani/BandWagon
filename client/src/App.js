import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SearchConcert from "./components/SearchConcert";
import "./App.css";


function App() {

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Redirect launches the signup page when the app starts */}
          <Redirect exact from="/" to="/login" />
          <Route exact path="/signup" component={SignUp} /> 
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/searchconcert" component={SearchConcert} />  
          <Route exact path="/profile" component={Profile} />            
        </Switch>
      </div>
    </Router>
  );
}

export default App;
