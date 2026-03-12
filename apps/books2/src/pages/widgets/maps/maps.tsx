import { MapsApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

const Maps = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <MapsApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Maps
