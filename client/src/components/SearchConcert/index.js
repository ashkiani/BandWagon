import React, { useState } from 'react'
import SearchResults from "../SearchResults";

export default function index() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState([]);

  async function getResults() {
    const returned = [];
    let query = "drake";
    const APIKEY = "?apikey=sAjeH10J9xYvDtmv&query=";
    const response1 = await fetch(`https://api.songkick.com/api/3.0/search/artists.json${APIKEY}${search}`);
    console.log(response1);
    const data = await response1.json();
    console.log(data);
    const artists = data.resultsPage.results.artist;
    const upperBound = Math.min(artists.length, 3);
    for (let i = 0; i < upperBound; i++) {
      const response2 = await fetch(`https://api.songkick.com/api/3.0/artists/${artists[i].id}/gigography.json${APIKEY}`);

      // Use this link https://api.songkick.com/api/3.0/artists/${artists[i].id}/calendar.json?apikey=${APIKEY}

      const data2 = await response2.json();
      const upperBoundEvents = Math.min(data2.resultsPage.results.event.length, 3);
      const events =[];
      for (let j=0; j<upperBoundEvents;j++){
        events.push(data2.resultsPage.results.event[j]);
      }
      returned.push({ artistId: artists[i].id, artistName: artists[i].displayName, events });
    }

    console.log(returned);
    setResult(returned);
  }
  return (
    <div>

      <form>
            <div id="top-section">
                <div id="search-div" className="container">
                    <h2>Let's find a concert <i className="fas fa-search"></i></h2>
                    
                    <div className="input-group mb-3">
                        <input
                           onChange={e => setSearch(e.target.value)}
                            name="search"
                            type="text"
                            className="form-control"
                            placeholder="Artist/Band Name"
                            id="search"
                        />
                        <div className="input-group-append">
                            {/* Button used to search concerts by artist */}
                            <button onClick={getResults} className="btn btn-success" type="button" id="btnArtistSearch">Search</button>
                        </div>
                    </div>
                 
                </div>
            </div>
        </form>

      <SearchResults results={result} />
    </div>

  )
 
}


