import React from 'react'
import axios from 'axios'
require ('dotenv').config()

class StravaInfo extends React.Component {
  componentDidMount() {
    this.getSegments()
  }
    // this.api.exploreSegments()

  //   var StravaApiV3 = require('strava_api_v3');
  //   var defaultClient = StravaApiV3.ApiClient.instance;

  //   // Configure OAuth2 access token for authorization: strava_oauth
  //   var strava_oauth = defaultClient.authentications['strava_oauth'];
  //   strava_oauth.accessToken = process.env.REACT_APP_STRAVA_ACCESS_TOKEN;

  //   var api = new StravaApiV3.SegmentsApi()

  //   var bounds = []; // {array[Float]} The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude]

  //   var opts = {
  //     'activityType': 'riding', // {String} Desired activity type.
  //     'minCat': 56, // {Integer} The minimum climbing category.
  //     'maxCat': 56 // {Integer} The maximum climbing category.
  //   };

  //   var callback = function(error, data, response) {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       console.log('API called successfully. Returned data: ' + data);
  //     }
  //   };
  //   api.exploreSegments(bounds, opts, callback);
  getSegments = () => {
    const segment = "https://www.strava.com/api/v3/segments/explore"
    const parameters = {
      access_token: process.env.REACT_APP_STRAVA_ACCESS_TOKEN,
      per_page: "10"

    }
    axios.get(segment + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      })
    })
    .catch(error => {
      console.error("error", error)
    })
  }
  render() {
    return(
      <div id='strava'></div>
    );
  }


}
export default StravaInfo;
