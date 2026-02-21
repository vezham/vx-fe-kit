import React from 'react'

import Sports01 from './sm/sports-01'
import Sports02 from './sm/sports-02'
import Sports03 from './sm/sports-03'
import Sports04 from './sm/sports-04'
import Sports05 from './sm/sports-05'
import Sports06 from './sm/sports-06'
import Sports07 from './sm/sports-07'

const Sports = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Sports</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>

      <div className="grid grid-cols-3 gap-5">
        <Sports01 />
        <Sports02 />
        <Sports03 />
        <Sports04 />
        <Sports05 />
        <Sports06 />
        <Sports07 />
      </div>
    </div>
  )
}

export default Sports
