import React from 'react'

import { StatusBar } from '../../../components/status-bar'
import { Widget, WidgetContent } from '../../../components/ui/widget'
import { PhotosApp } from '../../apple-widgets/photos'

const Photos = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <StatusBar />
            <PhotosApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Photos
