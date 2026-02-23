import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { PhoneApp } from '../../apple-widgets/phone'

const Phone = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <PhoneApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Phone
