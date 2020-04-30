import React, { useState } from 'react'
import SearchResults from "../SearchResults";

export default function index() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState([]);

  async function getResults() {
    const returned = [];
    const apiRes = await fetch("/api/api_key");
    const {API_KEY} = await apiRes.json();
    const response1 = await fetch(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${API_KEY}&query=${search}`);
    console.log(response1);
    const data = await response1.json();
    console.log(data);
    const artists = data.resultsPage.results.artist;
    const upperBound = Math.min(artists.length, 3);
    for (let i = 0; i < upperBound; i++) {
      const response2 = await fetch(`https://api.songkick.com/api/3.0/artists/${artists[i].id}/calendar.json?apikey=${API_KEY}`);
      const data2 = await response2.json();
      console.log(`https://api.songkick.com/api/3.0/artists/${artists[i].id}/calendar.json?apikey=${API_KEY}`)
      console.log(data2.resultsPage.results)
      if(data2.resultsPage.results.event != null)
      {
        // const upperBoundEvents = Math.min(data2.resultsPage.results.event.length, 3);
        const events =[];
        // for (let j=0; j<upperBoundEvents;j++){
          events.push(data2.resultsPage.results.event[0]);
        // }
        returned.push({ artistId: artists[i].id, artistName: artists[i].displayName, artistUrl: artists[i].uri, events });
      } 
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