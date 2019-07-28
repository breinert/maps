/*global google*/
import React from 'react'
import './App.css'
import Searchtab from './components/Searchtab'
import MarkerModal from './components/MarkerModal'
import axios from 'axios'
require ('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startPosition: [],
      finishPosition: [],
      venues: [],
      venueLocation: "",
      coffeeLocation: "choose",
    }
    this.handleCoffeeLocation = this.handleCoffeeLocation.bind(this);
    this.handleFindCoffee = this.handleFindCoffee.bind(this);
  }
  // initialize the map
  componentDidMount() {
    this.loadMap()
  }
  // check for change in venueLocation
  componentDidUpdate(prevState) {
    if (prevState.venueLocation !== this.state.venueLocation) {
      this.getStores()
    }
  }

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
    const infowindow = new google.maps.InfoWindow();
    //make markers for stores
    this.state.venues.map(myVenue => {
      const marker = new google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      });
      const contentString = `${myVenue.venue.name}`;
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      })
    })


  }


    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);

  // function to obtain info from foursquare
  getStores = () => {
    // const location = this.state.venueLocation;
    console.log(this.state.venueLocation);
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "JDO1KAGDULQO3ETFJ4EDPEHN203BEDKSD1HB5UUKRDP2R3H2",
      client_secret: "UWMFNIMGT33V31ZGCVI1GICMRK43DSYBJSNBNJTKC2ECKIHH",
      query: "coffee",
      radius: "1000",
      ll: this.state.venueLocation,
      v: "201811010"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      })
    })
    .catch(error => {
      console.error("error", error)
    })
  }

  this.setState({
    markers: Object.assign(this.state.markers, marker)
  });
  const venue = this.state.venues.find(venue => venue.venue.id === marker.id);
  console.log(venue);
  const endPoint = `https://api.foursquare.com/v2/venues/${marker.id}?`
  const parameters = {
    client_id: "JDO1KAGDULQO3ETFJ4EDPEHN203BEDKSD1HB5UUKRDP2R3H2",
    client_secret: "UWMFNIMGT33V31ZGCVI1GICMRK43DSYBJSNBNJTKC2ECKIHH",
    v: "20181010"
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    const myVenue = Object.assign(venue, response.data.response.venue );
    this.setState({ venues: Object.assign(this.state.venues, myVenue) });
    console.log(myVenue);
  })
  .catch(error => {
    console.error("error", error);
  })
}

  // functions for the searchtab
  handleCoffeeLocation(e) {
    this.setState({
      coffeeLocation: e.target.value
    });
    console.log(`After click: ${this.state.coffeeLocation}`)
  }

  handleFindCoffee() {
    // const venueLocation = this.state.venueLocation;
    const startPosition = this.state.startPosition;
    const finishPosition = this.state.finishPosition;
    const coffeeLocation = this.state.coffeeLocation;

    if (coffeeLocation === 'rideStart') {
      this.setState({
        venueLocation: startPosition.toString()
      })
    } else if (coffeeLocation === 'rideFinish') {
      this.setState({
        venueLocation: finishPosition.toString()
      })
    } else if (coffeeLocation === 'both') {
      this.setState({
        venueLocation: startPosition.toString() + finishPosition.toString()
      })
    } else {
      alert("Select a location for coffee");
    }
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
          <MarkerModal
          />
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
