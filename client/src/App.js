import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PersonalInfo from "./components/PersonalInfo";
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
      <Redirect exact from="/" to="/signup" />
      <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/personalinfo">
          <PersonalInfo />
        </Route>
        <Route exact path="/searchconcert">
          <SearchConcert />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}


export default App;
