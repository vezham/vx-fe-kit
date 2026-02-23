import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { CalendarApp } from '../../apple-widgets/calendar'

const CalendarAppWidget = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <CalendarApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default CalendarAppWidget
