import React from "react";

function SearchResults(props) {
  return (
    <ul className="list-group">
      {props.results.map(result => (
        <li className="list-group-item">
          <div className="card result-card">
            <div className="card-body">
              <h5 className="card-title">Artist/Band: {result.artistName}</h5>
              <hr />
              <div>
                {/* <p className="card-text"><b>Upcoming Event:</b> Rolling Loud presents \"Rolling Loud VIP SKYLOFT\" 2020</p> */}
                {/* {result.events.map(event => (
                  <div>
                <p className="card-text"><b>Venue:</b> {event.venue.displayName}</p>
                <p className="card-text"><b>Location:</b> {event.location.city}</p>
                <p className="card-text"><b>Date:</b> {event.start.date}</p>
                </div>
                )} */}
                {result.events.map(event =>
                  <div>
                    <p className="card-text"><b>Venue:</b> {event.venue.displayName}</p>
                    <p className="card-text"><b>Location:</b> {event.location.city}</p>
                    <p className="card-text"><b>Date:</b> {event.start.date}</p>
                  </div>
                )}
              </div>
              <a href="#" className="btn btn-success" data-id={result.id}>Interested</a>&nbsp;<a href={result.uri} target="_blank" className="btn btn-success">View Details</a>
            </div>
          </div>
        </li>

      ))}
    </ul>
  );
}

export default SearchResults;
