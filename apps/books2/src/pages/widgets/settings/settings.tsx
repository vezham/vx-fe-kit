import { SettingsApp } from '.'
import { Widget, WidgetContent } from '../../../ui/widget'

const Settings = () => {
  return (
    <>
      <Widget size="lg">
        <WidgetContent>
          <div className="flex w-full flex-col">
            <SettingsApp isOpen={true} />
          </div>
        </WidgetContent>
      </Widget>
    </>
  )
}

export default Settings
