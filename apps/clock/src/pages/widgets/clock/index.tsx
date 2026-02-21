import React from 'react'

import Clock01 from './sm/clock-01'
import Clock02 from './sm/clock-02'
import Clock03 from './sm/clock-03'
import Clock04 from './sm/clock-04'
import Clock05 from './sm/clock-05'
import Clock06 from './sm/clock-06'
import Clock07 from './sm/clock-07'
import Clock08 from './sm/clock-08'
import Clock09 from './sm/clock-09'
import Clock10 from './sm/clock-10'
import Clock11 from './sm/clock-11'
import Clock12 from './sm/clock-12'
import Clock13 from './sm/clock-13'

const Clock = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Clock</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>
      <div className="grid grid-cols-3 gap-5">
        <Clock01 />
        <Clock02 />
        <Clock03 />
        <Clock04 />
        <Clock05 />
        <Clock06 />
        <Clock07 />
        <Clock08 />
        <Clock09 />
        <Clock10 />
        <Clock11 />
        <Clock12 />
        <Clock13 />
      </div>
    </div>
  )
}

export default Clock
