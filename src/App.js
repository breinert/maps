/*global google*/
import React from 'react'
import './App.css'
import Searchtab from './components/Searchtab'
import axios from 'axios'
require ('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPosition: [],
      finishPosition: [],
      venues: [],
      venueLocation: [],
      coffeeLocation: "choose",
    }
    this.handleCoffeeLocation = this.handleCoffeeLocation.bind(this);
    this.handleFindCoffee = this.handleFindCoffee.bind(this);
  }

  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDUZDt6xP79oqTXaAB6leSmMCYzZkc4Zdo&callback=initMap")
    window.initMap = this.initMap
  }

  //function to make the google map
  initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.027587, lng: -83.0624},
      zoom: 13
    });
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    const markerStart = new google.maps.Marker({
      position: {lat: 40.0784, lng: -83.0377},
      map: map,
      title: 'Start',
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    markerStart.setMap(map);

    const markerFinish = new google.maps.Marker({
      position: {lat: 40.0440, lng: -83.0253},
      map: map,
      title: 'Finish',
      draggable: true,
      animation: google.maps.Animation.DROP
    });
    markerFinish.setMap(map);

    const self = this;

    markerStart.addListener('dragend', function (event) {
      let startPosition = self.state.startPosition;
      markerStart.setAnimation(google.maps.Animation.BOUNCE)
      self.setState({
        startPosition: [event.latLng.lat(), event.latLng.lng()]
      })
      console.log(event.latLng.lat());
    });
    markerFinish.addListener('dragend', function (event) {
      let finishPosition = self.state.finishPosition;
      markerFinish.setAnimation(google.maps.Animation.BOUNCE)
      self.setState({
        finishPosition: [event.latLng.lat(), event.latLng.lng()]
      })
      console.log(event.latLng.lat());
    });

    // const infowindow = new google.maps.InfoWindow();

    this.state.venues.map(myVenue => {
      const marker = new google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name

      });
    })
      // const contentString = `${myStart.title}`;

  }


    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);

  // function to obtain info from foursquare
  getStores = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: process.env.REACT_APP_FS_ID,
      client_secret: process.env.REACT_APP_FS_CS,
      categoryId: "4bf58dd8d48988d1e0931735",
      radius: "250",
      ll: this.state.venueLocation,
      v: "20181016"
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

  // functions for the searchtab
  handleCoffeeLocation(e) {
    this.setState({
      coffeeLocation: e.target.value
    });
    console.log(`After click: ${e.target.value}`)
  }

  handleFindCoffee() {
    const venueLocation = this.state.venueLocation;
    const startPosition = this.state.startPosition;
    const finishPosition = this.state.finishPosition;
    const coffeeLocation = this.state.coffeeLocation;

    if (coffeeLocation === 'rideStart') {
      this.setState({
        venueLocation: startPosition
      });
    } else if (coffeeLocation === 'rideFinish') {
        this.setState({
          venueLocation: finishPosition
        });
    } else if (coffeeLocation === 'both') {
      this.setState({
          venueLocation: [startPosition, finishPosition]
      });
    } else {
      alert("Select a location for coffee");
    }
    this.getStores();
  }

  render() {

    return (
      <div id="main">
        <header>
          <h1>Cycle & Coffee</h1>
        </header>
        <main>
          <Searchtab
          coffeeLocation = {this.state.coffeeLocation}
          handleCoffeeLocation = {this.handleCoffeeLocation}
          handleFindCoffee = {this.handleFindCoffee}
          />
          <div id="map"

          >
          </div>
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
