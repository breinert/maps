import React from 'react'

const Searchtab = (props) => {
  return (
    <div id="searchtab">
      <button onClick={(event) => props.handleClick(
        props.button, event.target.value
      )} id="start">{props.isToggleOn ? 'ON' : 'OFF'}</button>
      <button onClick={(event) => props.handleClick(
        props.button, event.target.value
      )} id="finish">Finish</button>
      <h3>Where would you like your coffee stop?</h3>
      <select id="coffeeLocation">
        value={props.coffeeLocation}
        onChange={props.handleCoffeeLocation}
        <option value="choose" disabled>Choose one</option>
        <option value="rideStart">Ride start</option>
        <option value="rideFinish">Ride finish</option>
        <option value="Both">Both</option>
      </select>
    </div>
  )
}
export default Searchtab
