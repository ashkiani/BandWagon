import React from "react";

function SearchResults(props) {

  function saveEvent(event) {
    event.preventDefault();
    const eventId = event.target.id;
    fetch("/api/interested", {
      method: "POST",
      body: JSON.stringify({ eventId }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        alert("Event Saved");
      } else {
        res.text().then(text => {
          if (text !== "The user has already marked this event.") {
            text = "Failed to save the event, please try again -" + text;
          }
          console.log(text);
          alert(text);
        }).catch(err => { alert("Error saving the event please try again later."); });
      }
    }).catch(err => { alert("Error saving the event please try again later."); });
  }
  return (
    <ul className="list-group">
      {props.results.map(result => (
        <li className="list-group-item">
          <div className="card result-card">
            <div className="card-body">
              <h5 className="card-title">Artist/Band: {result.artistName}</h5>
              <hr />
              <div>
                <p className="card-text"><b>Venue:</b> {result.events[0].displayName}</p>
                <p className="card-text"><b>Event Type:</b> {result.events[0].type}</p>
                <p className="card-text"><b>Date:</b> {result.events[0].start.date}</p>
              </div>
              <button className="btn btn-success" id={result.events[0].id} onClick={e => saveEvent(e)}>Interested</button>
              &nbsp;<a href={result.artistUrl} target="_blank" className="btn btn-success">View Details</a>
            </div>
          </div>
        </li>

      ))}
    </ul>
  );
}

export default SearchResults;