import React from 'react'

import ProductivityMD01 from './md/productivity-01'
import ProductivityMD02 from './md/productivity-02'
import ProductivityMD03 from './md/productivity-03'
import ProductivityMD04 from './md/productivity-04'
import ProductivitySM01 from './sm/productivity-01'
import ProductivitySM02 from './sm/productivity-02'
import ProductivitySM03 from './sm/productivity-03'
import ProductivitySM04 from './sm/productivity-04'
import ProductivitySM05 from './sm/productivity-05'
import ProductivitySM06 from './sm/productivity-06'
import ProductivitySM07 from './sm/productivity-07'

const Productivity = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Productivity</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>

      <div className="grid grid-cols-3 gap-5">
        <ProductivitySM01 />
        <ProductivitySM02 />
        <ProductivitySM03 />
        <ProductivitySM04 />
        <ProductivitySM05 />
        <ProductivitySM06 />
        <ProductivitySM07 />
      </div>
      <h2 className="py-4 text-lg font-bold">md</h2>
      <br></br>

      <div className="grid grid-cols-2 gap-5">
        <ProductivityMD01 />
        <ProductivityMD02 />
        <ProductivityMD03 />
        <ProductivityMD04 />
      </div>
    </div>
  )
}

export default Productivity
