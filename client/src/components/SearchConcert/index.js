import React from "react";

function SearchConcert() {
  return (
    <div>
    <div id="top-section">
        <div id="search-div" className="container">
          <h2>Let's find a concert <i className="fas fa-search"></i></h2>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Artist/Band Name" />
            <div className="input-group-append">
              <button className="btn btn-success" type="button" id="btnArtistSearch">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div id="search-results" className="container">
        <h2 className="text-center">Look at all of the events...</h2>
        <hr/>
        {/* This is what the search results should look like when results are returned from the api */}
        <div className="card result-card">
          <div className="card-body">
            <h5 className="card-title">Artist/Band: Drake</h5>
            <hr/>
            <p className="card-text"><b>Upcoming Event:</b> Rolling Loud presents \"Rolling Loud VIP SKYLOFT\" 2020</p>
            <p className="card-text"><b>Venue:</b> Hard Rock Stadium</p>
            <p className="card-text"><b>Location:</b> Miami, FL, US</p>
            <p className="card-text"><b>Date:</b> 2020-05-15</p>
            <a href="#" className="btn btn-success">Interested</a>&nbsp;<a href="#" className="btn btn-success">View Details</a>
          </div>
        </div>
      </div>
     
  </div>
  );
}

export default SearchConcert;
