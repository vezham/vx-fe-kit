import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { MusicApp } from '../../apple-widgets/music'
import { PhoneApp } from '../../apple-widgets/phone'

const Music = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <MusicApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Music
