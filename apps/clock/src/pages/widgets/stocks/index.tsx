import React from 'react'

import Stocks01 from './sm/stock-01'
import Stocks02 from './sm/stock-02'
import Stocks03 from './sm/stock-03'
import Stocks04 from './sm/stock-04'
import Stocks05 from './sm/stock-05'
import Stocks06 from './sm/stock-06'

const Stocks = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Stocks</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>

      <div className="grid grid-cols-3 gap-5">
        <Stocks01 />
        <Stocks02 />
        <Stocks03 />
        <Stocks04 />
        <Stocks05 />
        <Stocks06 />
      </div>
    </div>
  )
}

export default Stocks
