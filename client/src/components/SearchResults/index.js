import React from "react";

function SearchResults(props) {
  return (
    <ul className="list-group">
      {props.results.map(result => (
        <div className="border">
          <div>Artist ID:{result.artistId}</div>
          <div>Artist Name:{result.artistName}</div>
          {result.events.map(event => <div><div>Event ID: {event.id}</div><div>Event City: {event.location.city}</div><div>Venue: {event.venue.displayName}</div><div>Date: {event.start.date}</div><hr/></div>)}

        </div>
      ))}
    </ul>
  );
}

export default SearchResults;