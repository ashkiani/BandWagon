import React from "react";
import { NavLink } from 'react-router-dom';

function Nav() {

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">bandWAG<i className="far fa-grin-tongue-squint"></i>N</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-item" to="/searchconcert">
              <a className="nav-link" >Search Concert </a>
            </NavLink>
            <NavLink className="nav-item" to="/profile">
              <a className="nav-link" >My Profile</a> 
          </NavLink>   
          </ul>
        </div>
      </nav>
    
  );
}

export default Nav;
