import axios from "axios";

const BASEURL = "https://api.songkick.com/api/3.0/search/artists.json";
const APIKEY = "?apikey=sAjeH10J9xYvDtmv&query=";

// Export an object with a "search" method that searches the songkick API for the passed query
export default {
  search: function(query) {
     return axios.get(BASEURL + APIKEY + query)
     .then((res) =>{
       for(var i = 0; i < res.data.resultsPage.results.artist.length; i++){
        console.log(res.data.resultsPage.results.artist.length)
        console.log(`https://api.songkick.com/api/3.0/artists/${res.data.resultsPage.results.artist[i].id}/calendar.json?apikey=sAjeH10J9xYvDtmv`)
        return axios.get(`https://api.songkick.com/api/3.0/artists/${res.data.resultsPage.results.artist[i].id}/calendar.json?apikey=sAjeH10J9xYvDtmv`)
       }
     })
  }
};

