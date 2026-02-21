import React from 'react'

import CalendarMD01 from './md/calendar-01'
import CalendarMD02 from './md/calendar-02'
import CalendarMD03 from './md/calendar-03'
import CalendarSM01 from './sm/calendar-01'
import CalendarSM02 from './sm/calendar-02'
import CalendarSM03 from './sm/calendar-03'
import CalendarSM04 from './sm/calendar-04'
import CalendarSM05 from './sm/calendar-05'
import CalendarSM06 from './sm/calendar-06'

const Calendar = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Calendar</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>
      <div className="mb-5 grid grid-cols-3 gap-5">
        <CalendarSM01 />
        <CalendarSM02 />
        <CalendarSM03 />
        <CalendarSM04 />
        <CalendarSM05 />
        <CalendarSM06 />
      </div>
      <h2 className="text-lg font-bold">md</h2>
      <br></br>
      <div className="grid justify-center gap-5">
        <CalendarMD01 />
        <CalendarMD02 />
        <CalendarMD03 />
      </div>
    </div>
  )
}

export default Calendar
