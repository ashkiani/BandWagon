import React from "react";

function Profile() {
  return (
    <div>
    <div id="top-section">
    <div id="search-div" className="container">
      <h2>My Profile <i className="fas fa-user-alt"></i></h2>
    </div>
  </div>

  <div id="profile" className="container-fluid">
    <h2 className="text-center">What's up User's Name!! You've been busy.</h2>
    <hr/>
    <div className="row">
        <div className="col-3">
          {/* Render data from user when he/she signed up. Should be pulled from database */}
            <div className="card">
                <h5 className="card-header text-center bg-success text-white">Personal Info</h5>
                <div className="card-body bg-dark text-white">
                  <h5 className="card-title">User's Name</h5>
                  <p className="card-text"><b>Age:</b> 30</p>
                  <p className="card-text"><b>City of Interest:</b> Miami</p>
                  <p className="card-text"><b>Favorite Artist:</b> J. Cole</p>  
                </div>
              </div>
        </div>
        <div className="col-9" id="divInterests">
          {/* This is what the results should look like when returned from the database */}
            <div className="card interest-card">
                <div className="card-body">
               
                  <h5 className="card-title">Artist/Band: J. Cole <span><a href="#" className="btn btn-outline-success">Buy Tickets</a></span></h5>
                  
                  <hr/>
                  <p className="card-text"><b>Upcoming Event:</b> Rolling Loud presents \"Rolling Loud VIP SKYLOFT\" 2020</p>
                  <p className="card-text"><b>Venue:</b> Hard Rock Stadium</p>
                  <p className="card-text"><b>Location:</b> Miami, FL, US</p>
                  <p className="card-text"><b>Date:</b> 2020-05-15</p>
                  <a href="#" className="btn btn-success">Great Event <i className="fas fa-thumbs-up"></i></a>&nbsp;<a href="#" className="btn btn-danger">Lame <i className="fas fa-thumbs-down"></i></a>
                </div>
              </div>
     
        </div>
    </div>
  </div>  
  </div>
  );
}

export default Profile;
