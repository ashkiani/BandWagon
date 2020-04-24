import axios from "axios";

const BASEURL = "https://api.songkick.com/api/3.0/search/artists.json";
const APIKEY = "?apikey=sAjeH10J9xYvDtmv&query=";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query) {
    return axios.get(BASEURL + APIKEY + query);
  }
  // ,
  // eventInfo: function(artistID){
  //   return axios.get(`https://api.songkick.com/api/3.0/artists/${artistID}/calendar.json?apikey=sAjeH10J9xYvDtmv`);
  // }
};
