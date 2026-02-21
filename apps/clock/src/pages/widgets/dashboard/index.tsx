import React from 'react'

import DashboardLG01 from './lg/dashboard-01'
import DashboardLG02 from './lg/dashboard-02'
import DashboardMD01 from './md/dashboard-01'
import DashboardMD02 from './md/dashboard-02'
import DashboardSM01 from './sm/dashboard-01'
import DashboardSM02 from './sm/dashboard-02'
import DashboardSM03 from './sm/dashboard-03'
import DashboardSM04 from './sm/dashboard-04'
import DashboardSM05 from './sm/dashboard-05'
import DashboardSM06 from './sm/dashboard-06'

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Dashboard</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>
      <div className="grid grid-cols-3 gap-5">
        <DashboardSM01 />
        <DashboardSM02 />
        <DashboardSM03 />
        <DashboardSM04 />
        <DashboardSM05 />
        <DashboardSM06 />
      </div>
      <h2 className="py-4 text-lg font-bold">md</h2>
      <br></br>
      <div className="grid grid-cols-2 gap-5">
        <DashboardMD01 />
        <DashboardMD02 />
      </div>
      <h2 className="py-4 text-lg font-bold">lg</h2>
      <br></br>

      <div className="grid grid-cols-2 gap-5">
        <DashboardLG01 />
        <DashboardLG02 />
      </div>
    </div>
  )
}

export default Dashboard
