import image from "./assets/concert3.jpg";
import React, { Component } from 'react';
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/searchconcert");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        alert("Error logging in please try again");
      });
  }
  render() {
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
                <form onSubmit={this.onSubmit}>
                  <div className="card-body">
                    <h3 className="card-title">Login</h3>
                    <hr />
                    <div className="form-group">
                      <label >Username:</label>
                      <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required className="form-control" />
                      {/* <input type="text" className="form-control" id="username"/> */}
                    </div>
                    <div className="form-group">
                      <label >Password:</label>
                      <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} required className="form-control" />
                      {/* <input type="password" className="form-control" id="password"/> */}
                    </div>

                    {/* Button used to log user in */}
                    <input type="submit" value="Login" className="btn btn-dark" />
                  </div>
                </form>
                <hr />
                <button id="btnLogin" className="btn btn-dark ml-3" onClick={() => window.location.assign('/signup')}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}