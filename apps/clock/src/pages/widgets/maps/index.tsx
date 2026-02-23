import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { MapsApp } from '../../apple-widgets/maps'

const Maps = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <MapsApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Maps
