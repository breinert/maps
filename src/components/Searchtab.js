import React from 'react'

const Searchtab = (props) => {

  return (
    <div id="searchtab">
      <h3>Move the markers to the beggining and end of your ride. Then select where you would like your coffee stop(s)?</h3>
      <select id="coffeeLocation"
        value={props.coffeeLocation}
        onChange={props.handleCoffeeLocation}>
        <option value="choose" disabled>Choose one</option>
        <option value="rideStart">Ride start</option>
        <option value="rideFinish">Ride finish</option>
        <option value="Both">Both</option>
      </select>
      <button
      id="findCoffee"
      onClick={props.handleFindCoffee}
      >Find Coffee!</button>
    </div>
  )
}

export default Searchtab
