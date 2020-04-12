import React from "react";

function Nav() {
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">bandWAG<i className="far fa-grin-tongue-squint"></i>N</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" href="searchconcert">Search Concert </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="profile">My Profile</a> 
          </li>   
          </ul>
        </div>
      </nav>
    
  );
}

export default Nav;
