import { PhotosApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

const Photos = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <PhotosApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Photos
