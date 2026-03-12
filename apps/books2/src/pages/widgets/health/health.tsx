import { HealthApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

const Health = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <HealthApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Health
