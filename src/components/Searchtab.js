import React from 'react'

class Searchtab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeLocation: "choose",
      isToggleOnStart: true,
      isToggleOnFinish: true

    }
    this.handleCoffeeLocation = this.handleCoffeeLocation.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickFinish = this.handleClickFinish.bind(this);
  }
  
  handleCoffeeLocation(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
;
    this.setState({
      [name]: value
    });
    console.log(`After click: ${this.state.value}`)
  }

  handleClickStart() {
    this.setState(state => ({
      isToggleOnStart: !state.isToggleOnStart
    }));
    console.log(`After click: ${this.state.isToggleOnStart}`)
  }

  handleClickFinish() {
    this.setState(state => ({
      isToggleOnFinish: !state.isToggleOnFinish
    }));
    console.log(`After click: ${this.state.isToggleOnFinish}`)
  }
  render() {
    return (
      <div id="searchtab">
        <button onClick={(e) => this.handleClickStart(e)} id="start">{this.state.isToggleOnStart ? 'Start' : 'Select'}</button>
        <button onClick={(e) => this.handleClickFinish(e)} id="finish">{this.state.isToggleOnFinish ? 'Finish' : 'Select'}</button>
        <h3>Where would you like your coffee stop?</h3>
        <select id="coffeeLocation">
          value={this.state.coffeeLocation}
          onChange={(e) => this.handleCoffeeLocation(this.state.coffeeLocation, e.target.value)}
          <option value="choose" disabled>Choose one</option>
          <option value="rideStart">Ride start</option>
          <option value="rideFinish">Ride finish</option>
          {/* <option value="Both">Both</option> */}
        </select>
      </div>
    )
  }
}
export default Searchtab
