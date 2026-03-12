import { MusicApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

const Music = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <MusicApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Music
