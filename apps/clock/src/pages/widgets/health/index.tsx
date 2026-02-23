import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { HealthApp } from '../../apple-widgets/health'

const Health = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <HealthApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Health
