import React from "react";
import image from "./assets/concert3.jpg";

function SignUp() {

  // Use this function for the signup button
 function signUpNewUser() {
    window.location.assign('/login');
  }

  return (
    <div id="main-body">
      <div id="user-input" className="container">
        <div className="card mb-3" >
          <div className="row no-gutters">
            <div className="col-md-4" >
              <div className="main-page-logo">
                <h2 className="text-success">Welcome to the bandWAG<i className="far fa-grin-tongue-squint"></i>N</h2>
                <p>Discover millions of events, get alerts about your favorite artists, bands and more — plus always- secure, effortless ticketing.</p>
              </div>
              <img src={image} className="card-img" alt="bandwagon" />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">Join the bandWAG<i className="far fa-grin-tongue-squint"></i>N</h3>
                <hr />
                <div className="form-group">
                  <label >Username:</label>
                  <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                  <label >Password:</label>
                  <input type="password" className="form-control" id="password" />
                </div>
                <button id="btnSignUp" className="btn btn-dark" onClick={signUpNewUser}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
