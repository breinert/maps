import React from 'react'
import './App.css'
// import StravaInfo from './components/StravaInfo'
import axios from 'axios'
require ('dotenv').config()


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      venues: []
    }
  }

  componentDidMount() {
    this.loadMap()
    this.getSegments()
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDUZDt6xP79oqTXaAB6leSmMCYzZkc4Zdo&callback=initMap")
    window.initMap = this.initMap
  }
  //function to make the google map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.027587, lng: -83.0624},
      zoom: 13
    });
    const bikeLayer = new window.google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    this.state.venues.map(myVenue => {
      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })
    })
    // const trafficLayer = new window.google.maps.TrafficLayer();
    // trafficLayer.setMap(map);
  }

  // function to obtain info from foursquare
  getStores = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search";
    const parameters = {
      client_id: process.env.REACT_APP_FS_ID,
      client_secret: process.env.REACT_APP_FS_CS,
      query: "coffee",
      near: "Upper Arlington, OH",
      v: "20180323"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      console.error("error", error)
    })
  }

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
    return (
      <div id="main">
        <header>
          <h1>Cycle & Coffee</h1>
        </header>
        <main>
          <div id="map"></div>
          <div id="segments"></div>
        </main>
        <aside>
          <div id="foursquare"></div>
        </aside>
      </div>
    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}


export default App;
